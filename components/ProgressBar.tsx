"use client";
export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric to-gold transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
