import type { AnswerRecord, ContextAnswers, Lead } from "./types";

const KEY = "raio-x-magia-dos-detalhes-v1";

export interface PersistedState {
  answers: AnswerRecord[];
  context: ContextAnswers;
  lead?: Lead;
  step?: string;
  updatedAt: number;
}

export function loadState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, updatedAt: Date.now() }));
  } catch {}
}

export function clearState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
