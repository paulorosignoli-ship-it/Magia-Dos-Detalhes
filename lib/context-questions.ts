import type { ContextQuestion } from "./types";

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  {
    id: "role",
    label: "Qual é o seu papel na empresa?",
    options: [
      { value: "founder", label: "Sou fundador(a) / dono(a)" },
      { value: "partner", label: "Sou sócio(a)" },
      { value: "director", label: "Sou diretor(a) / executivo(a)" },
      { value: "manager", label: "Sou gestor(a) / coordenador(a)" },
      { value: "cx", label: "Trabalho diretamente com atendimento / experiência do cliente" },
      { value: "other_area", label: "Trabalho em outra área" },
      { value: "consultant", label: "Sou consultor(a) / profissional independente" },
      { value: "other", label: "Outro" },
    ],
  },
  {
    id: "companyStage",
    label: "Em que momento sua empresa está hoje?",
    options: [
      { value: "structuring", label: "Estamos estruturando a operação" },
      { value: "growing", label: "Estamos crescendo rapidamente" },
      { value: "organizing", label: "Estamos tentando organizar uma operação que cresceu" },
      { value: "improving", label: "Estamos buscando melhorar a experiência atual" },
      { value: "retention", label: "Estamos tentando aumentar retenção / recompra" },
      { value: "changing", label: "Estamos passando por uma mudança importante" },
      { value: "mature", label: "Nossa operação está madura e queremos evoluir" },
    ],
  },
  {
    id: "companySize",
    label: "Quantas pessoas trabalham aproximadamente na empresa?",
    options: [
      { value: "solo", label: "Só eu" },
      { value: "2_5", label: "2–5" },
      { value: "6_20", label: "6–20" },
      { value: "21_50", label: "21–50" },
      { value: "51_200", label: "51–200" },
      { value: "201_plus", label: "201+" },
    ],
  },
  {
    id: "relationshipStage",
    label: "Como você descreveria o relacionamento da empresa com seus clientes?",
    options: [
      { value: "first", label: "Ainda estamos conquistando os primeiros clientes" },
      { value: "informal", label: "Temos clientes, mas a experiência ainda é bastante informal" },
      { value: "structured", label: "Temos uma operação relativamente estruturada" },
      { value: "consistency", label: "Temos processos, mas queremos ganhar consistência" },
      { value: "mature", label: "Temos uma operação madura e queremos evoluir a experiência" },
      { value: "unknown", label: "Não sei dizer" },
    ],
  },
  {
    id: "mainChallenge",
    label: "Qual é o principal desafio relacionado aos seus clientes hoje?",
    options: [
      { value: "attract", label: "Atrair novos clientes" },
      { value: "explain", label: "Explicar melhor nosso valor" },
      { value: "consistent", label: "Entregar uma experiência consistente" },
      { value: "service", label: "Melhorar atendimento" },
      { value: "complaints", label: "Reduzir problemas / reclamações" },
      { value: "repurchase", label: "Aumentar recompra" },
      { value: "referral", label: "Aumentar indicação" },
      { value: "team", label: "Fazer a equipe entregar melhor" },
      { value: "journey", label: "Entender melhor a jornada do cliente" },
      { value: "other", label: "Outro" },
    ],
  },
];

export const getContextLabel = (id: string, value: string) => {
  const q = CONTEXT_QUESTIONS.find((c) => c.id === id);
  return q?.options.find((o) => o.value === value)?.label ?? value;
};
