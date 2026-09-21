"use client";

import Image from "next/image";
import type { BlockMeta } from "@/lib/types";

const ICONS: Record<string, string> = {
  clareza: "◉",
  "fios-condutores": "⌁",
  "chaves-do-sucesso": "✦",
  recompra: "↻",
  "proximo-passo": "→",
};

const IMAGES: Record<string, string> = {
  clareza: "/images/block-clareza.jpg",
  "fios-condutores": "/images/block-fios.jpg",
  "chaves-do-sucesso": "/images/block-chaves.jpg",
  recompra: "/images/block-recompra.jpg",
  "proximo-passo": "/images/block-proximo.jpg",
};

const IMAGE_ALTS: Record<string, string> = {
  clareza: "Clareza na experiência do cliente",
  "fios-condutores": "Fios condutores da experiência do cliente",
  "chaves-do-sucesso": "Chaves dos momentos decisivos da jornada",
  recompra: "Relacionamento e recompra",
  "proximo-passo": "Próximo passo da jornada do cliente",
};

export default function BlockIntro({ block }: { block: BlockMeta }) {
  const image = IMAGES[block.id];

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl text-gold" aria-hidden>{ICONS[block.id]}</span>
        <p className="text-electric text-xs tracking-[0.25em] uppercase font-medium">{block.kicker}</p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-mid/60 shadow-2xl">
        <div className="relative h-48 sm:h-64">
          <Image
            src={image}
            alt={IMAGE_ALTS[block.id] ?? block.title}
            fill
            sizes="(max-width: 640px) 100vw, 768px"
            className="object-cover object-center"
            priority={block.index === 1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/45 via-transparent to-electric/10" />
          <div className="absolute left-5 bottom-5 sm:left-8 sm:bottom-7">
            <span className="inline-flex rounded-full border border-white/15 bg-navy-deep/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream/75 backdrop-blur-sm">
              Magia dos Detalhes
            </span>
          </div>
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/10 blur-3xl" aria-hidden />
          <h2 className="relative font-display text-3xl sm:text-4xl text-cream">{block.title}</h2>
          <p className="relative mt-3 text-cream/70 text-sm sm:text-base max-w-xl">{block.description}</p>
        </div>
      </div>
    </div>
  );
}
