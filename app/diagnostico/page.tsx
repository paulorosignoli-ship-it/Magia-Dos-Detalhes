"use client";
import Link from "next/link";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { useRouter } from "next/navigation";

export default function DiagnosticoIntro() {
  const { reset } = useDiagnostic();
  const router = useRouter();
  const start = () => { reset(); router.push("/diagnostico/contexto"); };
  return (
    <div className="animate-fade-up">
      <p className="text-electric text-[11px] tracking-[0.3em] uppercase">Raio-X da Experiência do Cliente</p>
      <h1 className="mt-5 font-display text-3xl sm:text-5xl text-cream leading-tight">
        5 minutos. 22 perguntas.
        <br />
        <span className="text-gold">Uma decisão.</span>
      </h1>

      <div className="mt-8 space-y-4 text-cream/75 leading-relaxed">
        <p>
          Você vai passar por 5 blocos da jornada do seu cliente. Para cada pergunta,
          escolha o que <em>realmente acontece</em> na sua empresa — não o que deveria
          acontecer num mundo ideal.
        </p>

        <div className="border border-white/10 rounded-2xl p-5 bg-white/[0.02] text-sm">
          <p className="text-cream/60 text-xs tracking-widest uppercase mb-3">Escala</p>
          <ul className="space-y-2 text-cream/80">
            <li><span className="text-gold font-semibold">1</span> · Não existe</li>
            <li><span className="text-gold font-semibold">2</span> · Acontece raramente</li>
            <li><span className="text-gold font-semibold">3</span> · Acontece às vezes</li>
            <li><span className="text-gold font-semibold">4</span> · Acontece na maioria das vezes</li>
            <li><span className="text-gold font-semibold">5</span> · É um padrão</li>
          </ul>
        </div>

        <p className="text-cream/60 italic border-l-2 border-gold/60 pl-4">
          A resposta mais desconfortável costuma ser a mais útil. Não procure a resposta
          bonita — procure a verdadeira.
        </p>
      </div>

      <div className="mt-10 flex gap-3">
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center justify-center rounded-full bg-gold text-navy-deep font-semibold px-7 py-4 text-sm tracking-wide hover:bg-cream transition"
        >
          COMEÇAR
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-white/15 text-cream/80 px-6 py-4 text-sm hover:border-electric/60 transition"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
