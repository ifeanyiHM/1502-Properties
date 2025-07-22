import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    console.log("Incoming rejection request for ID:", id);

    if (!id) {
      return res.status(400).json({ error: "Missing property ID" });
    }

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

      return res.status(200).json({ message: "Property rejected and deleted" });
    } catch (err) {
      console.error("Server error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // If not POST
  return res.status(405).json({ error: "Method not allowed" });
}
