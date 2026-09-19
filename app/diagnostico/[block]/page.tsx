"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BLOCKS, getQuestionsByBlock } from "@/lib/questions";
import { useDiagnostic } from "@/context/DiagnosticContext";
import ProgressBar from "@/components/ProgressBar";
import BlockIntro from "@/components/BlockIntro";
import QuestionCard from "@/components/QuestionCard";
import type { BlockId } from "@/lib/types";
import clsx from "clsx";

const ORDER: BlockId[] = [
  "clareza", "fios-condutores", "chaves-do-sucesso", "recompra", "proximo-passo",
];

export default function BlockPage() {
  const params = useParams<{ block: string }>();
  const router = useRouter();
  const blockId = params.block as BlockId;
  const block = BLOCKS.find((b) => b.id === blockId);
  const questions = useMemo(() => getQuestionsByBlock(blockId), [blockId]);
  const {
    answers, setAnswer, setObservation, answeredCount, totalQuestions, hydrated,
  } = useDiagnostic();

  const [i, setI] = useState(0);
  const [loading, setLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!block) router.replace("/diagnostico/clareza");
  }, [block, router]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [i, blockId]);

  if (!block) return null;

  const q = questions[i];
  const existing = answers.find((a) => a.questionId === q.id);
  const value = existing?.score;
  const observation = existing?.observation;

  const isLast = i === questions.length - 1;
  const isFinalBlock = blockId === "proximo-passo";

  const advance = () => {
    if (!value) return;
    if (!isLast) {
      setI(i + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const currentIdx = ORDER.indexOf(blockId);
      const nextBlock = ORDER[currentIdx + 1];
      setLoading(false);
      if (nextBlock) router.push(`/diagnostico/${nextBlock}`);
      else router.push("/diagnostico/cadastro");
    }, 500);
  };

  const back = () => {
    if (i > 0) {
      setI(i - 1);
    } else {
      const currentIdx = ORDER.indexOf(blockId);
      const prevBlock = ORDER[currentIdx - 1];
      if (prevBlock) router.push(`/diagnostico/${prevBlock}`);
      else router.push("/diagnostico/contexto");
    }
  };

  const globalIndex = useMemo(() => {
    let count = 0;
    for (const b of ORDER) {
      if (b === blockId) break;
      count += getQuestionsByBlock(b).length;
    }
    return count + i + 1;
  }, [blockId, i]);

  const progress = Math.round((answeredCount / totalQuestions) * 100);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="mx-auto w-12 h-12 rounded-full border-2 border-white/10 border-t-gold animate-spin" />
          <p className="mt-4 text-cream/50 text-sm">Organizando as próximas perguntas…</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef}>
      <div className="mb-8">
        <ProgressBar value={progress} />
        <div className="mt-3 flex justify-between text-[11px] text-cream/40 tracking-widest uppercase">
          <span>{block.kicker}</span>
          <span>{progress}%</span>
        </div>
      </div>

      <BlockIntro block={block} />

      <div className="mt-10">
        <QuestionCard
          key={q.id}
          question={q}
          index={globalIndex}
          total={totalQuestions}
          value={value}
          observation={observation}
          onChange={(s) => setAnswer(q.id, blockId, s, observation)}
          onObservation={(t) => {
            if (value) setAnswer(q.id, blockId, value, t);
            else setObservation(q.id, t);
          }}
        />
      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={back}
          className="rounded-full border border-white/15 text-cream/70 px-6 py-3 text-sm hover:border-white/40 transition"
        >
          Voltar
        </button>
        <button
          type="button"
          disabled={!value}
          onClick={advance}
          className={clsx(
            "rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition",
            value
              ? "bg-gold text-navy-deep hover:bg-cream"
              : "bg-white/5 text-cream/30 cursor-not-allowed",
          )}
        >
          {isLast && isFinalBlock ? "Revelar diagnóstico" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
