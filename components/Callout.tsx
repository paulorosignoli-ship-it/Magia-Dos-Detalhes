"use client";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "info" | "gold" | "insight" | "warning";
const VARIANTS: Record<Variant, { border: string; bg: string; icon: string; iconColor: string }> = {
  info: { border: "border-electric/40", bg: "bg-electric/[0.04]", icon: "i", iconColor: "text-electric" },
  gold: { border: "border-gold/40", bg: "bg-gold/[0.05]", icon: "★", iconColor: "text-gold" },
  insight: { border: "border-gold/60", bg: "bg-gradient-to-br from-gold/[0.08] to-transparent", icon: "✦", iconColor: "text-gold" },
  warning: { border: "border-orange-400/40", bg: "bg-orange-400/[0.04]", icon: "!", iconColor: "text-orange-400" },
};
export default function Callout({ variant="info", title, children, className }: { variant?: Variant; title?: string; children: ReactNode; className?: string }) {
  const v=VARIANTS[variant];
  return <div className={clsx("rounded-2xl border p-5 sm:p-6 backdrop-blur-sm",v.border,v.bg,className)}>
    {title && <p className={clsx("text-[11px] tracking-[0.22em] uppercase font-medium mb-3",v.iconColor)}><span className="mr-2">{v.icon}</span>{title}</p>}
    <div className="text-cream/85 text-sm sm:text-[15px] leading-relaxed">{children}</div>
  </div>;
}
