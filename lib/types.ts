export type BlockId =
  | "clareza"
  | "fios-condutores"
  | "chaves-do-sucesso"
  | "recompra"
  | "proximo-passo";

export type Score = 1 | 2 | 3 | 4 | 5;

export interface AnswerOption {
  value: Score;
  label: string;
  hint: string;
}

export interface Question {
  id: string;
  block: BlockId;
  text: string;
  options: AnswerOption[];
  observationPrompt?: boolean;
}

export interface BlockMeta {
  id: BlockId;
  index: number;
  title: string;
  kicker: string;
  description: string;
}

export interface ContextQuestion {
  id: keyof ContextAnswers;
  label: string;
  options: { value: string; label: string }[];
}

export interface ContextAnswers {
  role?: string;
  companyStage?: string;
  companySize?: string;
  relationshipStage?: string;
  mainChallenge?: string;
}

export interface Lead {
  name: string;
  email: string;
  whatsapp?: string;
  whatsappOptIn: boolean;
  consent: boolean;
}

export interface AnswerRecord {
  questionId: string;
  block: BlockId;
  score: Score;
  observation?: string;
}

export interface DimensionScores {
  clareza: number;
  fiosCondutores: number;
  chavesDoSucesso: number;
  recompra: number;
  proximoPasso: number;
}

export interface DiagnosticResult {
  overall: number;
  dimensions: DimensionScores;
  weakest: BlockId;
  strongest: BlockId;
  gapFromAverage: number;
  primaryProfile: ProfileId;
  professionalMoment: MomentId;
  signals: Signal[];
}

export type ProfileId = "promessa" | "plantao" | "momentos" | "recompra";
export type MomentId = "A" | "B" | "C" | "D" | "E";

export interface Signal {
  type: "positive" | "attention";
  text: string;
}
