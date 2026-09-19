"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTEXT_QUESTIONS } from "@/lib/context-questions";
import { useDiagnostic } from "@/context/DiagnosticContext";
import clsx from "clsx";

export default function ContextoPage() {
  const router = useRouter();
  const { context, setContextAnswer, hydrated } = useDiagnostic();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!hydrated) return;
  }, [hydrated]);

  const q = CONTEXT_QUESTIONS[i];
  const current = (context as any)[q.id] as string | undefined;

  const next = () => {
    if (!current) return;
    if (i < CONTEXT_QUESTIONS.length - 1) setI(i + 1);
    else router.push("/diagnostico/clareza");
  };

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-8">
        <p className="text-electric text-[11px] tracking-[0.3em] uppercase">
          Contexto · {i + 1} de {CONTEXT_QUESTIONS.length}
        </p>
        <p className="text-cream/40 text-xs">
          Antes das perguntas da jornada
        </p>
      </div>

      <h2 className="font-display text-2xl sm:text-3xl text-cream leading-snug">
        {q.label}
      </h2>

      <div className="mt-7 grid gap-3">
        {q.options.map((opt) => {
          const selected = current === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setContextAnswer(q.id, opt.value)}
              className={clsx(
                "text-left rounded-2xl border p-4 transition-all duration-200 card-hover",
                selected
                  ? "border-gold bg-gradient-to-br from-gold/10 to-transparent"
                  : "border-white/10 bg-white/[0.02] hover:border-electric/50",
              )}
            >
              <span className={clsx("text-sm sm:text-[15px]", selected ? "text-cream" : "text-cream/85")}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={() => (i > 0 ? setI(i - 1) : router.push("/diagnostico"))}
          className="rounded-full border border-white/15 text-cream/70 px-6 py-3 text-sm hover:border-white/40 transition"
        >
          Voltar
        </button>
        <button
          type="button"
          disabled={!current}
          onClick={next}
          className={clsx(
            "rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition",
            current
              ? "bg-gold text-navy-deep hover:bg-cream"
              : "bg-white/5 text-cream/30 cursor-not-allowed",
          )}
        >
          {i < CONTEXT_QUESTIONS.length - 1 ? "Continuar" : "Ir para o Raio-X"}
        </button>
      </div>
    </div>
  );
}
