"use client";

import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from "react";
import type {
  AnswerRecord, BlockId, ContextAnswers, DiagnosticResult, Lead, Score,
} from "@/lib/types";
import { loadState, saveState, clearState } from "@/lib/storage";
import { QUESTIONS } from "@/lib/questions";
import { buildResult } from "@/lib/scoring";
import { resolveProfile } from "@/lib/profiles";
import { resolveMoment } from "@/lib/moments";

interface Ctx {
  hydrated: boolean;
  answers: AnswerRecord[];
  context: ContextAnswers;
  lead?: Lead;
  result?: DiagnosticResult;
  setAnswer: (qid: string, block: BlockId, score: Score, observation?: string) => void;
  setObservation: (qid: string, observation: string) => void;
  setContextAnswer: (id: keyof ContextAnswers, value: string) => void;
  setLead: (lead: Lead) => void;
  finalize: () => DiagnosticResult;
  reset: () => void;
  answeredCount: number;
  totalQuestions: number;
}

const DiagnosticContext = createContext<Ctx | null>(null);

export function DiagnosticProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [context, setContext] = useState<ContextAnswers>({});
  const [lead, setLeadState] = useState<Lead | undefined>();
  const [result, setResult] = useState<DiagnosticResult | undefined>();

  useEffect(() => {
    const s = loadState();
    if (s) {
      setAnswers(s.answers ?? []);
      setContext(s.context ?? {});
      setLeadState(s.lead);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState({ answers, context, lead, updatedAt: Date.now() });
  }, [answers, context, lead, hydrated]);

  const setAnswer: Ctx["setAnswer"] = (qid, block, score, observation) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === qid);
      if (existing) {
        return prev.map((a) =>
          a.questionId === qid ? { ...a, score, block, observation: observation ?? a.observation } : a,
        );
      }
      return [...prev, { questionId: qid, block, score, observation }];
    });
  };

  const setObservation: Ctx["setObservation"] = (qid, observation) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === qid ? { ...a, observation } : a)),
    );
  };

  const setContextAnswer: Ctx["setContextAnswer"] = (id, value) => {
    setContext((prev) => ({ ...prev, [id]: value }));
  };

  const setLead: Ctx["setLead"] = (l) => setLeadState(l);

  const finalize: Ctx["finalize"] = () => {
    const base = buildResult(answers);
    const profile = resolveProfile(base.dimensions, context.mainChallenge);
    const moment = resolveMoment(context, base.dimensions);
    const withProfile: DiagnosticResult = {
      ...base,
      primaryProfile: profile,
      professionalMoment: moment,
    };
    setResult(withProfile);
    return withProfile;
  };

  const reset = () => {
    clearState();
    setAnswers([]);
    setContext({});
    setLeadState(undefined);
    setResult(undefined);
  };

  const value = useMemo<Ctx>(
    () => ({
      hydrated,
      answers,
      context,
      lead,
      result,
      setAnswer,
      setObservation,
      setContextAnswer,
      setLead,
      finalize,
      reset,
      answeredCount: answers.length,
      totalQuestions: QUESTIONS.length,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hydrated, answers, context, lead, result],
  );

  return (
    <DiagnosticContext.Provider value={value}>{children}</DiagnosticContext.Provider>
  );
}

export function useDiagnostic() {
  const ctx = useContext(DiagnosticContext);
  if (!ctx) throw new Error("useDiagnostic must be used within DiagnosticProvider");
  return ctx;
}
