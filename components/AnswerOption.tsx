"use client";
import clsx from "clsx";
import type { AnswerOption as Opt } from "@/lib/types";

export default function AnswerOption({
  opt, selected, onSelect,
}: {
  opt: Opt;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "group w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-200",
        "card-hover",
        selected
          ? "border-gold bg-gradient-to-br from-gold/10 to-transparent shadow-[0_0_0_1px_rgba(245,200,91,.4)]"
          : "border-white/10 bg-white/[0.02] hover:border-electric/50 hover:bg-white/[0.04]",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={clsx(
            "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 transition",
            selected ? "border-gold bg-gold/20" : "border-white/25",
          )}
        >
          <span
            className={clsx(
              "text-[11px] font-semibold",
              selected ? "text-gold" : "text-cream/70",
            )}
          >
            {opt.value}
          </span>
        </div>
        <div className="flex-1">
          <p className={clsx(
            "font-medium text-sm sm:text-[15px]",
            selected ? "text-cream" : "text-cream/90",
          )}>
            {opt.label}
          </p>
          <p className="text-cream/50 text-xs sm:text-[13px] mt-1 leading-snug">
            {opt.hint}
          </p>
        </div>
      </div>
    </button>
  );
}
