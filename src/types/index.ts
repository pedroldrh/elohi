export interface Lead {
  id?: string;
  email: string;
  company: string;
  role: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at?: string;
}

export interface QuizAnswer {
  questionIndex: number;
  optionIndex: number;
}

export type Track = "LEARN" | "BUILD" | "SCALE";

export interface QuizResult {
  readinessScore: number;
  recommendedTrack: Track;
  gapTags: string[];
  rawScore: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  message: string;
}

export interface QuizSubmission {
  lead: Pick<Lead, "email" | "company" | "role">;
  answers: number[];
  result: QuizResult;
}
