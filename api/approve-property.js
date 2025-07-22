// /api/approve-property.js

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing property ID" });
  }

  try {
    const { data: pendingData, error: fetchError } = await supabaseAdmin
      .from("pending_properties")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !pendingData) {
      return res.status(404).json({ error: "Pending property not found" });
    }

    const { id: _, ...propertyWithoutId } = pendingData;

    const { error: insertError } = await supabaseAdmin
      .from("properties")
      .insert([propertyWithoutId]);

    if (insertError) {
      return res.status(500).json({ error: "Failed to approve property" });
    }

    await supabaseAdmin.from("pending_properties").delete().eq("id", id);

    if (pendingData.agentEmail) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: pendingData.agentEmail,
        subject: "Your Property Has Been Approved!",
        html: `<p>Hi ${pendingData.agentName || "there"},</p>
          <p>Your property <strong>${pendingData.title}</strong> has been approved and is now live on our platform.</p>
          <p>Thank you for choosing 1502 Properties!</p>`,
      });
    }

    return res.status(200).json({ message: "Property approved" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
