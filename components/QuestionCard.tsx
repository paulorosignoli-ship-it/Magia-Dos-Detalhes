"use client";
import { useState } from "react";
import type { Question, Score } from "@/lib/types";
import AnswerOption from "./AnswerOption";

export default function QuestionCard({
  question, index, total, value, observation,
  onChange, onObservation,
}: {
  question: Question;
  index: number;
  total: number;
  value?: Score;
  observation?: string;
  onChange: (s: Score) => void;
  onObservation: (t: string) => void;
}) {
  const [showObs, setShowObs] = useState(false);

  return (
    <div className="animate-fade-up">
      <p className="text-[11px] tracking-[0.22em] uppercase text-cream/40">
        Pergunta {index} de {total}
      </p>
      <h3 className="mt-3 text-lg sm:text-xl font-medium text-cream leading-snug">
        {question.text}
      </h3>

      <div className="mt-6 grid gap-3">
        {question.options.map((opt) => (
          <AnswerOption
            key={opt.value}
            opt={opt}
            selected={value === opt.value}
            onSelect={() => onChange(opt.value)}
          />
        ))}
      </div>

      {question.observationPrompt && (
        <div className="mt-5">
          {!showObs ? (
            <button
              type="button"
              onClick={() => setShowObs(true)}
              className="text-electric/80 hover:text-electric text-sm underline-offset-4 hover:underline"
            >
              + Quer dar um exemplo?
            </button>
          ) : (
            <div className="animate-fade-in">
              <label className="block text-xs uppercase tracking-widest text-cream/50 mb-2">
                Exemplo ou observação (opcional)
              </label>
              <textarea
                value={observation ?? ""}
                onChange={(e) => onObservation(e.target.value)}
                rows={3}
                placeholder="Ex.: isso acontece principalmente quando..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-electric/60"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
