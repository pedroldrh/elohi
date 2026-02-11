export interface QuizOption {
  label: string;
  points: number;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "How many employees do you have?",
    options: [
      { label: "1–2", points: 0 },
      { label: "3–10", points: 1 },
      { label: "11–50", points: 2 },
      { label: "51+", points: 3 },
    ],
  },
  {
    question: "Where are you in your journey?",
    options: [
      { label: "Idea stage", points: 0 },
      { label: "Selling locally", points: 1 },
      { label: "In a few restaurants", points: 2 },
      { label: "Regional expansion", points: 3 },
    ],
  },
  {
    question: "How confident are you with CRMs?",
    options: [
      { label: "Never used one", points: 0 },
      { label: "Basic", points: 1 },
      { label: "Solid", points: 2 },
      { label: "Advanced", points: 3 },
    ],
  },
  {
    question: "How well do you understand freight & distribution costs?",
    options: [
      { label: "Not at all", points: 0 },
      { label: "Somewhat", points: 1 },
      { label: "Good", points: 2 },
      { label: "Very strong", points: 3 },
    ],
  },
  {
    question: "Have you done a pricing study on your products?",
    options: [
      { label: "No", points: 0 },
      { label: "Informal", points: 1 },
      { label: "Yes, once", points: 2 },
      { label: "Yes, ongoing", points: 3 },
    ],
  },
  {
    question: "Do you have a go-to-market plan written down?",
    options: [
      { label: "No", points: 0 },
      { label: "Rough notes", points: 1 },
      { label: "Yes", points: 2 },
      { label: "Yes + KPIs", points: 3 },
    ],
  },
  {
    question: "Do you track trade spend / promo / discounts?",
    options: [
      { label: "No", points: 0 },
      { label: "Sometimes", points: 1 },
      { label: "Yes", points: 2 },
      { label: "Yes + model", points: 3 },
    ],
  },
  {
    question: "Do you have clear target accounts/customers?",
    options: [
      { label: "No", points: 0 },
      { label: "A few", points: 1 },
      { label: "A defined list", points: 2 },
      { label: "Pipeline + outreach", points: 3 },
    ],
  },
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
export const MAX_SCORE = 24; // 8 questions × 3 points max
