import type { AnswerRecord, ContextAnswers, DiagnosticResult, Lead } from "./types";
import { QUESTIONS } from "./questions";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_KEY);

let clientPromise: Promise<any> | null = null;
async function getClient() {
  if (!supabaseEnabled) return null;
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(SUPABASE_URL!, SUPABASE_KEY!),
    );
  }
  return clientPromise;
}

export interface SubmissionPayload {
  lead: Lead;
  context: ContextAnswers;
  answers: AnswerRecord[];
  result: DiagnosticResult;
}

export async function submitDiagnostic(payload: SubmissionPayload) {
  const client = await getClient();
  if (!client) {
    // eslint-disable-next-line no-console
    console.info("[diagnóstico] supabase desativado, payload:", payload);
    return { ok: true, offline: true };
  }

  try {
    const { data: respondent, error: rErr } = await client
      .from("respondents")
      .insert({
        name: payload.lead.name,
        email: payload.lead.email,
        whatsapp: payload.lead.whatsapp ?? null,
        whatsapp_opt_in: payload.lead.whatsappOptIn,
        role: payload.context.role ?? null,
        company_stage: payload.context.companyStage ?? null,
        company_size: payload.context.companySize ?? null,
        customer_relationship_stage: payload.context.relationshipStage ?? null,
        main_challenge: payload.context.mainChallenge ?? null,
      })
      .select("id")
      .single();

    if (rErr) throw rErr;
    const respondentId = respondent.id;

    await client.from("answers").insert(
      payload.answers.map((a) => ({
        respondent_id: respondentId,
        question_id: a.questionId,
        block: a.block,
        score: a.score,
        answer_label: QUESTIONS.find((q) => q.id === a.questionId)?.options.find((o) => o.value === a.score)?.label ?? String(a.score),
        observation: a.observation ?? null,
      })),
    );

    const d = payload.result.dimensions;
    await client.from("results").insert({
      respondent_id: respondentId,
      overall_score: payload.result.overall,
      clarity_score: d.clareza,
      conducting_threads_score: d.fiosCondutores,
      success_keys_score: d.chavesDoSucesso,
      repurchase_score: d.recompra,
      next_step_score: d.proximoPasso,
      primary_profile: payload.result.primaryProfile,
      professional_moment: payload.result.professionalMoment,
    });

    return { ok: true, respondentId };
  } catch (err) {
    console.error("[diagnóstico] erro ao enviar:", err);
    return { ok: false };
  }
}
