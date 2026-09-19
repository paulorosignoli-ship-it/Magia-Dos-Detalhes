import type { ContextAnswers, DimensionScores, MomentId } from "./types";

export interface Moment {
  id: MomentId;
  label: string;
  description: string;
}

export const MOMENTS: Record<MomentId, Moment> = {
  A: {
    id: "A",
    label: "Estruturando a experiência",
    description:
      "Você está em um momento de construção. Antes de sofisticar, vale desenhar o básico que precisa acontecer sempre — e por quê.",
  },
  B: {
    id: "B",
    label: "Organizando o crescimento",
    description:
      "Sua empresa cresceu e a experiência começou a ficar inconsistente. Este é o momento clássico de transformar talento individual em padrão.",
  },
  C: {
    id: "C",
    label: "Padronizando a experiência",
    description:
      "Já existem processos, mas eles ainda dependem demais de pessoas específicas. O próximo ganho vem de consistência e verificação.",
  },
  D: {
    id: "D",
    label: "Acelerando recompra",
    description:
      "A base está sólida. A oportunidade agora está em desenhar o que acontece depois da entrega — quando o cliente naturalmente precisará de você de novo.",
  },
  E: {
    id: "E",
    label: "Otimizando uma operação madura",
    description:
      "Sua operação já é madura. O desafio não é reinventar — é refinar detalhes que ninguém está olhando ainda.",
  },
};

export function resolveMoment(
  ctx: ContextAnswers,
  dims: DimensionScores,
): MomentId {
  const avg = Object.values(dims).reduce((s, v) => s + v, 0) / 5;

  if (avg >= 78) return "E";

  const stage = ctx.companyStage ?? "";
  const challenge = ctx.mainChallenge ?? "";

  if (challenge === "repurchase" || challenge === "referral") return "D";
  if (stage === "retention") return "D";
  if (stage === "organizing" || stage === "improving") return "C";
  if (stage === "growing") return "B";
  if (stage === "structuring" || stage === "changing") return "A";
  if (stage === "mature") return avg >= 70 ? "E" : "C";

  if (avg >= 65) return "C";
  if (avg >= 50) return "B";
  return "A";
}
