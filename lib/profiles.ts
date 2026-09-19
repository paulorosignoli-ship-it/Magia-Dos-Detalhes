import type { BlockId, DimensionScores, ProfileId } from "./types";

export interface Profile {
  id: ProfileId;
  title: string;
  interpretation: string;
  reflections: string[];
  nextFocus: string;
  primaryBlock: BlockId;
}

export const PROFILES: Record<ProfileId, Profile> = {
  promessa: {
    id: "promessa",
    title: "A promessa ainda não virou experiência",
    interpretation:
      "Existe uma distância entre aquilo que sua empresa promete e o que o cliente encontra na prática. Isso costuma aparecer em dúvidas antes da compra, expectativas que não se confirmam e fricção no primeiro contato.",
    reflections: [
      "O que o cliente acredita que vai acontecer antes de comprar?",
      "Onde nasce a dúvida, a espera ou a fricção?",
      "Qual promessa poderia ficar mais simples sem perder valor?",
      "Existe diferença entre o que marketing comunica e o que a operação entrega?",
    ],
    nextFocus: "Tríade da Clareza — Espelho, Lápis e Luneta.",
    primaryBlock: "clareza",
  },
  plantao: {
    id: "plantao",
    title: "A experiência depende de quem está de plantão",
    interpretation:
      "Pessoas diferentes acabam entregando experiências diferentes, mesmo quando todas têm boa intenção. Talento individual é valioso, mas não escala.",
    reflections: [
      "Quais 2 ou 3 sensações deveriam aparecer sempre, não importa quem atende?",
      "Quais detalhes reforçam essas sensações hoje?",
      "O que precisa virar comportamento simples e repetível?",
    ],
    nextFocus: "Fios Condutores + padrões claros de atendimento.",
    primaryBlock: "fios-condutores",
  },
  momentos: {
    id: "momentos",
    title: "Os momentos decisivos ainda não são padrão",
    interpretation:
      "Você pode saber o que quer entregar — mas ainda não traduziu isso em momentos, responsáveis e verificações. Sem isso, a excelência fica dependente de sorte.",
    reflections: [
      "Quais são os 3 momentos que mais pesam na percepção do cliente?",
      "O que precisa acontecer nos bastidores — e na frente dele?",
      "Como você vai saber, com certeza, que aconteceu?",
      "Quem é responsável por corrigir quando falha?",
    ],
    nextFocus: "Chaves do Sucesso.",
    primaryBlock: "chaves-do-sucesso",
  },
  recompra: {
    id: "recompra",
    title: "Você entrega — mas a história termina cedo",
    interpretation:
      "A jornada termina na entrega. O cliente recebe o que comprou, mas não existe um próximo capítulo suficientemente desenhado. É aí que boa parte do faturamento evapora em silêncio.",
    reflections: [
      "Quando, naturalmente, esse cliente vai precisar de você de novo?",
      "Que ritual de relacionamento faria sentido para o seu negócio?",
      "Qual motivo legítimo existe para ele voltar — além de desconto?",
      "Você sabe com dados por que clientes não retornam?",
    ],
    nextFocus: "Mola da Recompra.",
    primaryBlock: "recompra",
  },
};

export function resolveProfile(
  dimensions: DimensionScores,
  contextMainChallenge: string | undefined,
): ProfileId {
  const dims: [ProfileId, number][] = [
    ["promessa", dimensions.clareza],
    ["plantao", dimensions.fiosCondutores],
    ["momentos", dimensions.chavesDoSucesso],
    ["recompra", Math.min(dimensions.recompra, dimensions.proximoPasso)],
  ];

  dims.sort((a, b) => a[1] - b[1]);
  let primary = dims[0][0];

  const challengeMap: Record<string, ProfileId> = {
    explain: "promessa",
    consistent: "plantao",
    service: "plantao",
    complaints: "momentos",
    repurchase: "recompra",
    referral: "recompra",
    team: "plantao",
    journey: "momentos",
  };

  if (contextMainChallenge && challengeMap[contextMainChallenge]) {
    const ctxProfile = challengeMap[contextMainChallenge];
    const gap = dims[1][1] - dims[0][1];
    if (gap <= 6 && ctxProfile === dims[1][0]) {
      primary = ctxProfile;
    }
  }

  return primary;
}
