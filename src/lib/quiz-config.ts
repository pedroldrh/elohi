export type QuestionType = "yesno" | "yesno_detail" | "text";

export interface QuizQuestion {
  question: string;
  type: QuestionType;
  placeholder?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Is your product currently in production?",
    type: "yesno",
  },
  {
    question: "Are you currently selling in retail? If so, what's your volume?",
    type: "yesno_detail",
    placeholder: "e.g. 500 units/month, $50K annual revenue",
  },
  {
    question: "Are you currently selling in foodservice? If so, what's your volume?",
    type: "yesno_detail",
    placeholder: "e.g. 200 cases/month, 50 accounts",
  },
  {
    question: "Do you have a foodservice strategy?",
    type: "yesno",
  },
  {
    question: "Is your brand in Dot?",
    type: "yesno",
  },
  {
    question: "What distributors carry your product?",
    type: "text",
    placeholder: "e.g. Sysco, US Foods, UNFI, etc.",
  },
  {
    question: "Do you have a foodservice-specific company website? If so, what's the URL?",
    type: "yesno_detail",
    placeholder: "https://",
  },
  {
    question: "Do you have foodservice-specific social media accounts? If so, please provide names/accounts.",
    type: "yesno_detail",
    placeholder: "e.g. @brand_foodservice on Instagram",
  },
  {
    question: "Do you have GDSN?",
    type: "yesno",
  },
  {
    question: "Do you work with a GPO or CMC?",
    type: "yesno",
  },
  {
    question: "What is your trade spend?",
    type: "text",
    placeholder: "e.g. $100K annually, 15% of revenue",
  },
  {
    question: "Do you use a CRM?",
    type: "yesno",
  },
  {
    question: "Where do you believe ESA could best help your company?",
    type: "text",
    placeholder: "Tell us about your biggest challenges or goals...",
  },
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
