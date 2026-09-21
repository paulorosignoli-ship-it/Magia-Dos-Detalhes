"use client";
import type { BlockMeta } from "@/lib/types";
const ICONS: Record<string,string> = { clareza:"◉", "fios-condutores":"⌁", "chaves-do-sucesso":"✦", recompra:"↻", "proximo-passo":"→" };
export default function BlockIntro({ block }: { block: BlockMeta }) {
  return <div className="animate-fade-up">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-2xl text-gold" aria-hidden>{ICONS[block.id]}</span>
      <p className="text-electric text-xs tracking-[0.25em] uppercase font-medium">{block.kicker}</p>
    </div>
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-transparent to-electric/[0.04] p-6 sm:p-8">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/10 blur-3xl" aria-hidden />
      <h2 className="relative font-display text-3xl sm:text-4xl text-cream">{block.title}</h2>
      <p className="relative mt-3 text-cream/70 text-sm sm:text-base max-w-xl">{block.description}</p>
    </div>
  </div>;
}
