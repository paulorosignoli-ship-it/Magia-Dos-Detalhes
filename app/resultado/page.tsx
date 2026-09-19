"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDiagnostic } from "@/context/DiagnosticContext";
import { PROFILES } from "@/lib/profiles";
import { MOMENTS } from "@/lib/moments";
import DimensionBars from "@/components/DimensionBars";
import SignalList from "@/components/SignalList";
import AnswerReview from "@/components/AnswerReview";
import ShareBar from "@/components/ShareBar";
import { getContextLabel } from "@/lib/context-questions";
import type { BlockId } from "@/lib/types";

function ResultInner() {
  const router = useRouter();
  const { hydrated, answers, context, lead, result, finalize } = useDiagnostic();

  useEffect(() => {
    if (!hydrated) return;
    if (!answers.length) {
      router.replace("/diagnostico");
      return;
    }
    if (!result) finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, answers.length]);

  if (!hydrated || !answers.length || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-gold animate-spin" />
      </div>
    );
  }

  const profile = PROFILES[result.primaryProfile];
  const moment = MOMENTS[result.professionalMoment];
  const firstName = (lead?.name ?? "").split(" ")[0];

  const priorities: Record<BlockId, { headline: string; actions: string[] }> = {
    clareza: {
      headline: "Escolha uma promessa e faça a operação inteira confirmá-la.",
      actions: [
        "Reescreva a promessa central em uma frase simples.",
        "Liste 3 pontos onde o cliente hoje duvida antes de comprar.",
        "Meça quantos clientes chegam com a expectativa correta.",
      ],
    },
    "fios-condutores": {
      headline: "Transforme 2 sensações em comportamentos repetíveis.",
      actions: [
        "Escolha 2 sensações que precisam ser sempre as mesmas.",
        "Defina 3 comportamentos visíveis que as produzem.",
        "Documente em uma página única e treine com o time.",
      ],
    },
    "chaves-do-sucesso": {
      headline: "Escolha um momento crítico da jornada e transforme-o em padrão.",
      actions: [
        "Liste os 3 momentos que mais pesam na percepção do cliente.",
        "Defina o que precisa acontecer antes, durante e depois.",
        "Defina como você vai saber, com certeza, que aconteceu.",
      ],
    },
    recompra: {
      headline: "Desenhe o próximo capítulo — não apenas o próximo cupom.",
      actions: [
        "Mapeie quando o cliente naturalmente precisará de você de novo.",
        "Crie um ritual simples de relacionamento entre compras.",
        "Ofereça um motivo legítimo de retorno além de desconto.",
      ],
    },
    "proximo-passo": {
      headline: "Defina o próximo passo que você quer provocar — e meça.",
      actions: [
        "Escreva qual comportamento você quer ver no cliente em 90 dias.",
        "Escolha um indicador simples que mostre se funcionou.",
        "Revise semanalmente. Ajuste o detalhe, não a estratégia.",
      ],
    },
  };

  const priority = priorities[result.weakest];
  const dims = result.dimensions;
  const blockLabels: Record<BlockId, string> = {
    clareza: "Clareza",
    "fios-condutores": "Fios Condutores",
    "chaves-do-sucesso": "Chaves do Sucesso",
    recompra: "Mola da Recompra",
    "proximo-passo": "Próximo Passo",
  };

  return (
    <main className="relative min-h-screen star-field">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 py-12 sm:py-20">
        <section className="animate-fade-up">
          <p className="text-electric text-[11px] tracking-[0.3em] uppercase">
            Seu Raio-X está pronto
          </p>
          {firstName && (
            <p className="mt-4 text-cream/60 text-sm">Olá, {firstName}.</p>
          )}
          <h1 className="mt-3 font-display text-3xl sm:text-5xl text-cream leading-[1.1]">
            Seu principal ponto de atenção hoje está em:
          </h1>
          <p className="mt-6 text-gold font-display text-2xl sm:text-4xl leading-tight">
            {profile.title}
          </p>
          <p className="mt-6 text-cream/75 leading-relaxed max-w-2xl">
            {profile.interpretation}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full border border-white/10 text-cream/70">
              Foco: {blockLabels[result.weakest]}
            </span>
            {result.gapFromAverage >= 10 && (
              <span className="px-3 py-1 rounded-full border border-gold/40 text-gold">
                Diferença relevante em relação à média
              </span>
            )}
          </div>
        </section>

        <section className="mt-16 animate-fade-up">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl sm:text-6xl text-cream tabular-nums">
              {result.overall}
            </span>
            <span className="text-cream/50 text-sm">/ 100 maturidade geral</span>
          </div>
          <p className="mt-3 text-cream/60 text-sm max-w-xl leading-relaxed">
            Não é uma nota — é um retrato. Serve para você saber de onde partir.
          </p>
        </section>

        <section className="mt-14 animate-fade-up">
          <h2 className="font-display text-2xl text-cream mb-6">
            Sua jornada em cinco dimensões
          </h2>
          <DimensionBars dims={dims} />
        </section>

        <section className="mt-14 animate-fade-up">
          <h2 className="font-display text-2xl text-cream mb-6">
            O que suas respostas mostraram
          </h2>
          <SignalList signals={result.signals} />
        </section>

        <section className="mt-14 animate-fade-up">
          <p className="text-electric text-[11px] tracking-[0.3em] uppercase">
            Seu momento profissional
          </p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl text-cream">
            {moment.label}
          </h2>
          <p className="mt-4 text-cream/70 leading-relaxed">{moment.description}</p>

          {(context.role || context.companyStage) && (
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {context.role && (
                <span className="px-3 py-1 rounded-full border border-white/10 text-cream/70">
                  {getContextLabel("role", context.role)}
                </span>
              )}
              {context.companyStage && (
                <span className="px-3 py-1 rounded-full border border-white/10 text-cream/70">
                  {getContextLabel("companyStage", context.companyStage)}
                </span>
              )}
              {context.mainChallenge && (
                <span className="px-3 py-1 rounded-full border border-white/10 text-cream/70">
                  Desafio: {getContextLabel("mainChallenge", context.mainChallenge)}
                </span>
              )}
            </div>
          )}
        </section>

        <section className="mt-14 animate-fade-up">
          <p className="text-electric text-[11px] tracking-[0.3em] uppercase">
            Seu foco para os próximos 90 dias
          </p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl text-cream leading-snug">
            {priority.headline}
          </h2>
          <p className="mt-4 text-cream/70 leading-relaxed">
            Não tente consertar toda a experiência de uma vez.
          </p>

          <ol className="mt-8 grid gap-4">
            {priority.actions.map((a, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border border-white/10 rounded-2xl p-5 bg-white/[0.02]"
              >
                <span className="text-gold font-display text-2xl leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-cream/85">{a}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 animate-fade-up">
          <h2 className="font-display text-2xl text-cream mb-5">
            Perguntas que valem ficar com você
          </h2>
          <ul className="grid gap-3">
            {profile.reflections.map((r) => (
              <li key={r} className="flex items-start gap-3 text-cream/75">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-cream/50 text-sm">
            Próximo foco sugerido: <span className="text-gold">{profile.nextFocus}</span>
          </p>
        </section>

        <section className="mt-14 animate-fade-up">
          <AnswerReview answers={answers} />
        </section>

        <section className="mt-16 border border-gold/30 rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-gold/[0.06] to-transparent">
          <p className="text-electric text-[11px] tracking-[0.3em] uppercase">
            Kit Magia dos Detalhes
          </p>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl text-cream leading-snug">
            Quer transformar esse diagnóstico em ação?
          </h2>
          <p className="mt-4 text-cream/70 leading-relaxed">
            Um toolkit prático para transformar o que você descobriu em um plano de
            implementação.
          </p>
          <ul className="mt-6 grid gap-2 text-cream/80 text-sm sm:grid-cols-2">
            <li>✓ Mapa da Jornada do Cliente</li>
            <li>✓ Fios Condutores</li>
            <li>✓ Chaves do Sucesso</li>
            <li>✓ Mola da Recompra</li>
            <li>✓ Plano de Implementação em 90 dias</li>
          </ul>
          <a
            href="#kit"
            className="mt-8 inline-flex rounded-full bg-gold text-navy-deep font-semibold px-7 py-4 text-sm tracking-wide hover:bg-cream transition"
          >
            CONHECER O KIT
          </a>
        </section>

        <section className="mt-14 animate-fade-up">
          <p className="text-cream/60 text-sm mb-4">
            Quer compartilhar seu diagnóstico?
          </p>
          <ShareBar />
        </section>

        <section className="mt-14 animate-fade-up text-center border-t border-white/5 pt-12">
          <p className="font-display text-cream/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            “Você não precisa melhorar toda a experiência de uma vez. Precisa descobrir
            qual detalhe merece atenção primeiro. Agora você sabe onde começar.”
          </p>
          <p className="mt-6 text-cream/60 text-sm">Phillipe Lontra</p>
          <p className="text-cream/40 text-xs">Idealizador da Magia dos Detalhes</p>
        </section>

        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className="text-cream/50 hover:text-electric text-sm transition"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ResultadoPage() {
  return <ResultInner />;
}
