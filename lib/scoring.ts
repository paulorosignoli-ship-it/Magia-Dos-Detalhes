import { QUESTIONS } from "./questions";
import type {
  AnswerRecord, BlockId, DimensionScores, DiagnosticResult, Signal,
} from "./types";

const DIMENSION_OF_BLOCK: Record<BlockId, keyof DimensionScores> = {
  clareza: "clareza",
  "fios-condutores": "fiosCondutores",
  "chaves-do-sucesso": "chavesDoSucesso",
  recompra: "recompra",
  "proximo-passo": "proximoPasso",
};

export const scoreToPercent = (avg: number) =>
  Math.round(((avg - 1) / 4) * 100);

export function calculateBlockScore(
  answers: AnswerRecord[],
  block: BlockId,
): number {
  const list = answers.filter((a) => a.block === block);
  if (!list.length) return 0;
  const avg = list.reduce((s, a) => s + a.score, 0) / list.length;
  return scoreToPercent(avg);
}

export function calculateDimensions(answers: AnswerRecord[]): DimensionScores {
  const blocks: BlockId[] = [
    "clareza", "fios-condutores", "chaves-do-sucesso",
    "recompra", "proximo-passo",
  ];
  const out: Partial<DimensionScores> = {};
  blocks.forEach((b) => {
    (out as any)[DIMENSION_OF_BLOCK[b]] = calculateBlockScore(answers, b);
  });
  return out as DimensionScores;
}

export function calculateOverallScore(answers: AnswerRecord[]): number {
  if (!answers.length) return 0;
  const avg = answers.reduce((s, a) => s + a.score, 0) / answers.length;
  return scoreToPercent(avg);
}

export function identifyWeakestDimension(d: DimensionScores) {
  const entries = Object.entries(d) as [keyof DimensionScores, number][];
  entries.sort((a, b) => a[1] - b[1]);
  return entries[0][0];
}

export function identifyStrongestDimension(d: DimensionScores) {
  const entries = Object.entries(d) as [keyof DimensionScores, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

const DIM_TO_BLOCK: Record<keyof DimensionScores, BlockId> = {
  clareza: "clareza",
  fiosCondutores: "fios-condutores",
  chavesDoSucesso: "chaves-do-sucesso",
  recompra: "recompra",
  proximoPasso: "proximo-passo",
};

export function generateSignals(answers: AnswerRecord[]): Signal[] {
  const signals: Signal[] = [];
  const byId = Object.fromEntries(answers.map((a) => [a.questionId, a.score]));

  const push = (id: string, positive: string, attention: string) => {
    const s = byId[id];
    if (!s) return;
    if (s >= 4) signals.push({ type: "positive", text: positive });
    else if (s <= 2) signals.push({ type: "attention", text: attention });
  };

  push("clareza_01",
    "Você tem clareza sobre por que o cliente deveria escolher sua empresa.",
    "O cliente ainda não entende com clareza por que escolher sua empresa.");
  push("clareza_02",
    "Aquilo que você promete na comunicação parece estar próximo do que entrega.",
    "Existe uma distância entre a promessa comunicada e a experiência real.");
  push("fios_03",
    "A experiência parece manter identidade mesmo com pessoas diferentes atendendo.",
    "A experiência ainda depende de quem está de plantão.");
  push("fios_02",
    "Existem detalhes construídos intencionalmente para reforçar sensações.",
    "As sensações que você quer gerar ainda não são reforçadas por detalhes intencionais.");
  push("chaves_01",
    "Você sabe quais são os momentos que mais pesam na percepção do cliente.",
    "Os momentos decisivos da jornada ainda não estão claramente identificados.");
  push("chaves_04",
    "Existe verificação sobre se os momentos críticos acontecem como planejado.",
    "Os momentos críticos ainda não são medidos — você descobre o problema quando ele já ocorreu.");
  push("recompra_01",
    "Existe uma experiência planejada logo após a compra.",
    "As primeiras 24–72 horas pós-compra ainda não têm uma experiência desenhada.");
  push("recompra_03",
    "Você entende, com evidências, por que clientes deixam de voltar.",
    "Você ainda não sabe com clareza por que clientes deixam de comprar novamente.");
  push("recompra_05",
    "Existem motivos relevantes para o cliente voltar além de desconto.",
    "Hoje o principal motivo de retorno parece ser desconto.");
  push("proximo_03",
    "Você consegue escolher UMA prioridade para os próximos 90 dias.",
    "Falta clareza sobre qual melhoria priorizar nos próximos 90 dias.");

  return signals;
}

export function buildResult(answers: AnswerRecord[]): DiagnosticResult {
  const dimensions = calculateDimensions(answers);
  const overall = calculateOverallScore(answers);
  const weakest = identifyWeakestDimension(dimensions);
  const strongest = identifyStrongestDimension(dimensions);
  const weakestValue = dimensions[weakest];
  const avg = Object.values(dimensions).reduce((s, v) => s + v, 0) / 5;
  const gap = Math.max(0, Math.round(avg - weakestValue));
  const signals = generateSignals(answers);

  return {
    overall,
    dimensions,
    weakest: DIM_TO_BLOCK[weakest],
    strongest: DIM_TO_BLOCK[strongest],
    gapFromAverage: gap,
    primaryProfile: "promessa",
    professionalMoment: "A",
    signals,
  };
}

export const dimensionKeyOfBlock = (b: BlockId) => DIMENSION_OF_BLOCK[b];
export const blockOfDimension = (k: keyof DimensionScores) => DIM_TO_BLOCK[k];
export const allQuestions = QUESTIONS;
