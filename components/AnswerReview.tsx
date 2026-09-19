"use client";
import { useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import type { AnswerRecord } from "@/lib/types";

export default function AnswerReview({ answers }: { answers: AnswerRecord[] }) {
  const [open, setOpen] = useState(false);
  const byId = Object.fromEntries(answers.map((a) => [a.questionId, a]));

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] text-left"
      >
        <span className="text-sm font-medium text-cream">Ver minhas respostas</span>
        <span className="text-cream/60 text-sm">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="divide-y divide-white/[0.05]">
          {QUESTIONS.map((q, i) => {
            const a = byId[q.id];
            return (
              <div key={q.id} className="px-5 py-4">
                <p className="text-xs text-cream/50">
                  {String(i + 1).padStart(2, "0")} · {q.text}
                </p>
                <p className="mt-1 text-sm text-cream">
                  {a ? `${a.score} — ${q.options.find((o) => o.value === a.score)?.label}` : "—"}
                </p>
                {a?.observation && (
                  <p className="mt-1 text-xs text-cream/60 italic">“{a.observation}”</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
