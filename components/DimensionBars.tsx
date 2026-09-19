"use client";
import type { DimensionScores } from "@/lib/types";

const LABELS: Record<keyof DimensionScores, string> = {
  clareza: "Clareza",
  fiosCondutores: "Fios Condutores",
  chavesDoSucesso: "Chaves do Sucesso",
  recompra: "Mola da Recompra",
  proximoPasso: "Próximo Passo",
};

export default function DimensionBars({ dims }: { dims: DimensionScores }) {
  const entries = Object.entries(dims) as [keyof DimensionScores, number][];

  return (
    <div className="grid gap-5">
      {entries.map(([key, value], i) => (
        <div key={key} className="animate-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cream/85">{LABELS[key]}</span>
            <span className="text-sm font-medium text-gold tabular-nums">
              {value}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric via-sky to-gold transition-all duration-1000 ease-out"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
