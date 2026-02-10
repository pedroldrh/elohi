import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(`contact:${ip}`, 3);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot check — if "website" field is filled, silently succeed
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const { name, email, company, role, interest, message } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: name || null,
        email,
        company: company || null,
        role: role || null,
        interest: interest || null,
        message: message || null,
      });

      if (error) {
        console.error("[Contact] Insert error:", error);
      }
    } catch (err) {
      console.error("[Contact] Supabase error:", err);
    }
  } else {
    console.log("[Contact] No Supabase configured. Message logged:", {
      name,
      email,
      company,
      interest,
    });
  }

  // Notification email to team
  sendEmail({
    to: process.env.EMAIL_FROM || "hello@elohi.us",
    subject: `New contact: ${name || email}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Role:</strong> ${role || "N/A"}</p>
      <p><strong>Interest:</strong> ${interest || "N/A"}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `,
  }).catch(() => {});

  return NextResponse.json({ success: true });
}
