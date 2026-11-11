export const CATEGORIES = ['Rede', 'Hardware', 'Acessos/Credenciais', 'Software', 'Outros'] as const;
export type Category = (typeof CATEGORIES)[number];

export const URGENCY_LEVELS = ['Baixa', 'Média', 'Alta'] as const;
export type Urgency = (typeof URGENCY_LEVELS)[number];

export interface TriageResult {
  category: Category;
  urgency: Urgency;
  summary: string;
  steps: string[];
}

export interface Ticket extends TriageResult {
  id: string;
  description: string;
  created_at: string;
}

export interface AnalysisView {
  description: string;
  result: TriageResult;
  saved: boolean;
}
