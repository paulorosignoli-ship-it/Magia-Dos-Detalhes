"use client";
import type { BlockMeta } from "@/lib/types";

const BLOCK_IMAGES: Record<string, string> = {
  clareza: "/images/block-clareza.jpg",
  "fios-condutores": "/images/block-fios.jpg",
  "chaves-do-sucesso": "/images/block-chaves.jpg",
  recompra: "/images/block-recompra.jpg",
  "proximo-passo": "/images/block-proximo.jpg",
};

const BLOCK_ICONS: Record<string, string> = {
  clareza: "👁",
  "fios-condutores": "🧵",
  "chaves-do-sucesso": "🔑",
  recompra: "🔄",
  "proximo-passo": "→",
};

export default function BlockIntro({ block }: { block: BlockMeta }) {
  return (
    <div className="animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl" aria-hidden>{BLOCK_ICONS[block.id]}</span>
            <p className="text-electric text-xs tracking-[0.25em] uppercase font-medium">
              {block.kicker}
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-cream">
            {block.title}
          </h2>
          <p className="mt-3 text-cream/70 text-sm sm:text-base max-w-xl">
            {block.description}
          </p>
        </div>

        <div className="hidden sm:block w-32 h-32 shrink-0 rounded-2xl overflow-hidden border border-white/10">
          <img
            src={BLOCK_IMAGES[block.id]}
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
