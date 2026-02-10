import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { calculateQuizResult } from "@/lib/quiz-scoring";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/resend";
import { syncLeadToHubSpot } from "@/lib/hubspot";
import type { QuizSubmission } from "@/types";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(`quiz:${ip}`, 5);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  let body: QuizSubmission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { lead, answers } = body;

  if (!lead?.email || !Array.isArray(answers) || answers.length !== 9) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Server-side recalculation (don't trust client score)
  const result = calculateQuizResult(answers);

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
            readiness_score: result.readinessScore,
            recommended_track: result.recommendedTrack,
            gap_tags: result.gapTags,
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
      score: result.readinessScore,
      track: result.recommendedTrack,
    });
  }

  // Send result email (non-blocking)
  sendEmail({
    to: lead.email,
    subject: `Your Elohi Readiness Score: ${result.readinessScore}%`,
    html: `
      <h2>Your Foodservice Readiness Results</h2>
      <p>Score: <strong>${result.readinessScore}%</strong></p>
      <p>Recommended track: <strong>${result.recommendedTrack}</strong></p>
      <p>Key areas to address: ${result.gapTags.join(", ")}</p>
      <p><a href="https://elohi.us/services">Learn more about how we can help →</a></p>
    `,
  }).catch(() => {});

  // Sync to HubSpot (non-blocking)
  syncLeadToHubSpot(lead).catch(() => {});

  return NextResponse.json({ result });
}
