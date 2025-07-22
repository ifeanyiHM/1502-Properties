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
  }

  return res.status(405).json({ error: "Method not allowed" });
}
