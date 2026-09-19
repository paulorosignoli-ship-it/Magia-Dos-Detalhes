"use client";
import { useState } from "react";

export default function ShareBar() {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = "Acabei de fazer meu Raio-X da Experiência do Cliente. Vale a pena.";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
        target="_blank" rel="noreferrer"
        className="px-4 py-2 rounded-full border border-white/15 text-sm text-cream hover:border-electric/60 transition"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        className="px-4 py-2 rounded-full border border-white/15 text-sm text-cream hover:border-electric/60 transition"
      >
        LinkedIn
      </a>
      <button
        onClick={copy}
        className="px-4 py-2 rounded-full border border-white/15 text-sm text-cream hover:border-electric/60 transition"
      >
        {copied ? "Link copiado ✓" : "Copiar link"}
      </button>
    </div>
  );
}
