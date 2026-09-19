"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { submitDiagnostic } from "@/lib/supabase";
import clsx from "clsx";

export default function CadastroPage() {
  const router = useRouter();
  const { context, answers, finalize, setLead } = useDiagnostic();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Informe um e-mail válido.";
    if (optIn && whatsapp.replace(/\D/g, "").length < 10)
      e.whatsapp = "Informe um WhatsApp válido (com DDD).";
    if (!consent) e.consent = "É necessário autorizar o uso dos dados.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    const lead = {
      name: name.trim(),
      email: email.trim(),
      whatsapp: optIn ? whatsapp.trim() : undefined,
      whatsappOptIn: optIn,
      consent,
    };
    setLead(lead);

    const result = finalize();
    submitDiagnostic({ lead, context, answers, result }).catch(() => {});

    setTimeout(() => router.push("/resultado"), 400);
  };

  return (
    <div className="animate-fade-up max-w-xl">
      <p className="text-electric text-[11px] tracking-[0.3em] uppercase">Última etapa</p>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl text-cream leading-tight">
        Seu diagnóstico está pronto.
      </h1>
      <p className="mt-4 text-cream/70 leading-relaxed">
        Encontramos alguns padrões nas suas respostas. Agora vamos organizar isso
        para você.
      </p>
      <p className="mt-6 text-cream/60 text-sm">
        Antes de revelar seu resultado, onde podemos enviar uma cópia do seu diagnóstico?
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-cream/50 mb-2">
            Nome *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-electric/60"
            placeholder="Como podemos te chamar?"
          />
          {errors.name && <p className="mt-1 text-xs text-gold">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-cream/50 mb-2">
            E-mail *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-electric/60"
            placeholder="voce@empresa.com"
          />
          {errors.email && <p className="mt-1 text-xs text-gold">{errors.email}</p>}
        </div>

        <div>
          <label className="flex items-center gap-3 text-sm text-cream/80 cursor-pointer">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="accent-gold w-4 h-4"
            />
            Quero receber também meu diagnóstico pelo WhatsApp.
          </label>
          {optIn && (
            <div className="mt-3">
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-electric/60"
                placeholder="(11) 99999-9999"
              />
              {errors.whatsapp && (
                <p className="mt-1 text-xs text-gold">{errors.whatsapp}</p>
              )}
            </div>
          )}
        </div>

        <label className="flex items-start gap-3 text-xs text-cream/60 leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="accent-gold w-4 h-4 mt-0.5"
          />
          Autorizo o uso dos meus dados para receber meu diagnóstico e comunicações
          relacionadas à Magia dos Detalhes.
        </label>
        {errors.consent && <p className="text-xs text-gold">{errors.consent}</p>}

        <button
          type="submit"
          disabled={submitting}
          className={clsx(
            "mt-2 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition",
            !submitting
              ? "bg-gold text-navy-deep hover:bg-cream"
              : "bg-white/5 text-cream/40 cursor-wait",
          )}
        >
          {submitting ? "Organizando seu resultado…" : "VER MEU RESULTADO"}
        </button>

        <p className="text-cream/40 text-xs leading-relaxed">
          Seus dados serão usados para gerar seu diagnóstico e, se você optar, enviar
          o material por WhatsApp. Você pode solicitar a remoção a qualquer momento.
        </p>
      </form>
    </div>
  );
}
