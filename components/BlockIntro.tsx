"use client";
import type { BlockMeta } from "@/lib/types";

export default function BlockIntro({ block }: { block: BlockMeta }) {
  return (
    <div className="animate-fade-up">
      <p className="text-electric text-xs tracking-[0.25em] uppercase font-medium">
        {block.kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl text-cream">
        {block.title}
      </h2>
      <p className="mt-3 text-cream/70 text-sm sm:text-base max-w-xl">
        {block.description}
      </p>
    </div>
  );
}
