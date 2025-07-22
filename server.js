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

// Set allowed origins based on environment
const allowedOrigins = isProduction
  ? // ? ["https://your-production-frontend.com"] // 🔁 replace with your frontend domain
    ["http://localhost:4000/"] // 🔁 replace with your frontend domain
  : ["http://localhost:5173"]; // Vite default port

// Configure middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
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
        from: "onboarding@resend.dev",
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
    const { error } = await supabaseAdmin
      .from("pending_properties")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Rejection delete error:", error);
      return res
        .status(500)
        .json({ error: "Failed to reject/delete property" });
    }

    res.status(200).json({ message: "Property rejected and deleted" });
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
    const { error } = await supabaseAdmin
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return res.status(500).json({ error: "Failed to delete property" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
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
