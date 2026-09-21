"use client";
export default function PatternDivider({ align="center" }: { align?: "center" | "left" }) {
  return <div className={align === "center" ? "flex justify-center" : "flex justify-start"} aria-hidden>
    <div className="flex items-center gap-3 py-10 sm:py-14">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-electric/40" />
      <span className="text-electric/70 text-lg">✦</span>
      <span className="h-px w-24 bg-gradient-to-r from-electric/40 via-gold/40 to-electric/40" />
      <span className="text-gold/80 text-lg">✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-electric/40" />
    </div>
  </div>;
}
