import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.log("[Resend] No API key configured. Email skipped:", { to, subject });
    return null;
  }

  const from = process.env.EMAIL_FROM || "Elohi <hello@elohi.us>";

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("[Resend] Error sending email:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("[Resend] Failed to send email:", err);
    return null;
  }
}
