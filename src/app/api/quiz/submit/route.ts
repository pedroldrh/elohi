import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/resend";
import { syncLeadToHubSpot } from "@/lib/hubspot";
import { QUIZ_QUESTIONS } from "@/lib/quiz-config";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(`quiz:${ip}`, 5);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  let body: { lead: { email: string; company: string; role: string }; answers: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { lead, answers } = body;

  if (!lead?.email || !Array.isArray(answers)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  if (supabase) {
    try {
      // Upsert lead
      const { data: leadData, error: leadError } = await supabase
        .from("leads")
        .upsert(
          {
            email: lead.email,
            company: lead.company || null,
            role: lead.role || null,
            source: "quiz",
          },
          { onConflict: "email" }
        )
        .select("id")
        .single();

      if (leadError) {
        console.error("[Quiz] Lead upsert error:", leadError);
      }

      // Save quiz response
      if (leadData?.id) {
        const { error: quizError } = await supabase
          .from("quiz_responses")
          .insert({
            lead_id: leadData.id,
            answers_json: answers,
          });

        if (quizError) {
          console.error("[Quiz] Response insert error:", quizError);
        }
      }
    } catch (err) {
      console.error("[Quiz] Supabase error:", err);
    }
  } else {
    console.log("[Quiz] No Supabase configured. Submission logged:", {
      email: lead.email,
      answers,
    });
  }

  // Build answer summary for email
  const answerSummary = answers
    .map((answer, i) => {
      const q = QUIZ_QUESTIONS[i];
      return q ? `<p><strong>${q.question}</strong><br/>${answer || "—"}</p>` : "";
    })
    .join("");

  // Send notification email to team (non-blocking)
  sendEmail({
    to: lead.email,
    subject: "Thanks for completing the Elohi questionnaire!",
    html: `
      <h2>Your Responses</h2>
      <p>Thank you for taking the time to complete our questionnaire. Our team will review your answers and be in touch soon.</p>
      <hr/>
      ${answerSummary}
      <hr/>
      <p><a href="https://elohi.us/contact">Book a strategy call →</a></p>
    `,
  }).catch(() => {});

  // Sync to HubSpot (non-blocking)
  syncLeadToHubSpot(lead).catch(() => {});

  return NextResponse.json({ success: true });
}
