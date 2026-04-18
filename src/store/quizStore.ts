import { create } from 'zustand';

interface QuizState {
  currentExamId: string | null;
  selectedParts: string[];
  userAnswers: Record<string, number>; 
  isSubmitted: boolean;
  score: number;
  startQuiz: (examId: string, parts: string[]) => void;
  setAnswer: (questionId: number, answerIndex: number) => void;
  submitQuiz: (totalCorrect: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentExamId: null,
  selectedParts: [],
  userAnswers: {},
  isSubmitted: false,
  score: 0,
  startQuiz: (examId, parts) => set({ currentExamId: examId, selectedParts: parts, userAnswers: {}, isSubmitted: false, score: 0 }),
  setAnswer: (questionId, answerIndex) => 
    set((state) => ({
      userAnswers: { ...state.userAnswers, [questionId]: answerIndex }
    })),
  submitQuiz: (totalCorrect) => set({ isSubmitted: true, score: totalCorrect }),
  resetQuiz: () => set({ currentExamId: null, selectedParts: [], userAnswers: {}, isSubmitted: false, score: 0 })
}));
