// server.js
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Resend } from "resend";

// Load environment variables
dotenv.config();

const app = express();

// Detect environment
const isProduction = process.env.NODE_ENV === "production";
const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
  "https://www.1502properties.com",
  "https://1502properties.com",
  "http://localhost:5173",
  "https://phoenixglobal.vercel.app",
  "https://www.phoenixglobal.vercel.app",
  "https://phoenixglobal.onrender.com",
  "https://www.phoenixglobal.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming origin:", origin); // for debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// ✅ CORS middleware should be FIRST
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json());

// Create Supabase admin client
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Endpoint to approve property
app.post("/approve-property", async (req, res) => {
  const { id } = req.body;
  console.log("Incoming approval request for ID:", id);

  if (!id) return res.status(400).json({ error: "Missing property ID" });

  try {
    const { data: pendingData, error: fetchError } = await supabaseAdmin
      .from("pending_properties")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !pendingData) {
      console.error("Fetch error:", fetchError);
      return res.status(404).json({ error: "Pending property not found" });
    }

    // Strip the id field to let Supabase auto-generate a new one
    const { id: _, ...propertyWithoutId } = pendingData;

    const { error: insertError } = await supabaseAdmin
      .from("properties")
      .insert([propertyWithoutId]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return res.status(500).json({ error: "Failed to approve property" });
    }

    // Remove from pending table
    await supabaseAdmin.from("pending_properties").delete().eq("id", id);

    // 📧 Send email using Resend
    if (!pendingData.agentEmail) {
      console.warn("No agent email found; skipping email notification.");
    } else {
      const { error: emailError } = await resend.emails.send({
        from: "no-reply@1502properties.com",
        to: pendingData.agentEmail,
        subject: "Your Property Has Been Approved!",
        html: `<p>Hi ${pendingData.agentName || "there"},</p>
           <p>Your property <strong>${pendingData.title}</strong> has been approved and is now live on our platform.</p>
           <p>Thank you for choosing 1502 Properties!</p>`,
      });

      if (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    res.status(200).json({ message: "Property approved with new ID" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to reject (delete) a pending property

app.post("/reject-property", async (req, res) => {
  const { id } = req.body;
  console.log("Incoming rejection request for ID:", id);

  if (!id) return res.status(400).json({ error: "Missing property ID" });

  try {
    // 1. Get the property data first (to fetch image URLs)
    const { data, error: fetchError } = await supabaseAdmin
      .from("pending_properties")
      .select("src") // assuming image URLs are stored in the "src" column as an array
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching property before deletion:", fetchError);
      return res.status(500).json({ error: "Could not fetch property data" });
    }

    const imageUrls = data?.src || [];

    // 2. Convert public URLs back to storage paths
    const storagePaths = imageUrls
      .map((url) => {
        try {
          const pathStart = url.indexOf("/properties/") + "/properties/".length;
          return url.substring(pathStart);
        } catch {
          return null;
        }
      })
      .filter((p) => p); // remove nulls

    // 3. Delete the images from Supabase Storage
    if (storagePaths.length > 0) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("properties")
        .remove(storagePaths);

      if (storageError) {
        console.error("Storage deletion error:", storageError);
        // continue with DB deletion anyway
      }
    }

    // 4. Delete the property from the database
    const { error: deleteError } = await supabaseAdmin
      .from("pending_properties")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Database delete error:", deleteError);
      return res
        .status(500)
        .json({ error: "Failed to reject/delete property" });
    }

    res.status(200).json({
      message: "Property rejected and associated images deleted successfully",
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to delete a property from the "properties" table

app.post("/delete-property", async (req, res) => {
  const { id } = req.body;
  console.log("Incoming request to delete approved property ID:", id);

  if (!id) return res.status(400).json({ error: "Missing property ID" });

  try {
    // 1. Fetch the property data (to get image URLs)
    const { data: propertyData, error: fetchError } = await supabaseAdmin
      .from("properties")
      .select("src") // assuming 'src' is the image URL array
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching property for image deletion:", fetchError);
      return res.status(500).json({ error: "Failed to fetch property data" });
    }

    // 2. Extract file paths from public URLs
    const imagePaths =
      propertyData?.src?.map((url) =>
        // Assuming all files are in the 'properties' bucket and you use 'getPublicUrl'
        decodeURIComponent(
          url.split("/storage/v1/object/public/properties/")[1]
        )
      ) || [];

    // 3. Delete images from storage
    if (imagePaths.length > 0) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("properties")
        .remove(imagePaths);

      if (storageError) {
        console.error("Error deleting images from storage:", storageError);
        return res
          .status(500)
          .json({ error: "Failed to delete property images" });
      }
    }

    // 4. Delete the property from the database
    const { error: deleteError } = await supabaseAdmin
      .from("properties")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Delete error:", deleteError);
      return res.status(500).json({ error: "Failed to delete property" });
    }

    res
      .status(200)
      .json({ message: "Property and images deleted successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Endpoint to fetch all users
app.get("/all-users", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    const users = data.users.map((user) => ({
      id: user.id,
      userCode: user.user_metadata?.userCode || null,
    }));

    res.status(200).json(users);

    // res.status(200).json(data.users);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server on dynamic port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${
      isProduction ? "production" : "development"
    } mode on port ${PORT}`
  )
);
