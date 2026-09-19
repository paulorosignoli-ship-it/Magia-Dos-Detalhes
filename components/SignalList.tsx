"use client";
import type { Signal } from "@/lib/types";

export default function SignalList({ signals }: { signals: Signal[] }) {
  if (!signals.length) {
    return (
      <p className="text-cream/60 text-sm">
        Não foram encontrados sinais extremos — isso sugere uma base razoavelmente equilibrada.
      </p>
    );
  }
  return (
    <ul className="grid gap-3">
      {signals.map((s, i) => (
        <li
          key={i}
          className="animate-fade-up flex items-start gap-3 text-sm text-cream/85"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <span
            className={
              s.type === "positive"
                ? "mt-0.5 text-electric font-semibold"
                : "mt-0.5 text-gold font-semibold"
            }
          >
            {s.type === "positive" ? "✓" : "⚠"}
          </span>
          <span>{s.text}</span>
        </li>
      ))}
    </ul>
  );
}
