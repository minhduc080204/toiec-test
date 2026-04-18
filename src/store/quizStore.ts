import { create } from 'zustand';

interface QuizState {
  currentPart: string | null;
  userAnswers: Record<number, number>; // questionId -> selectedOptionIndex
  isSubmitted: boolean;
  score: number;
  startQuiz: (part: string) => void;
  setAnswer: (questionId: number, answerIndex: number) => void;
  submitQuiz: (totalCorrect: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentPart: null,
  userAnswers: {},
  isSubmitted: false,
  score: 0,
  startQuiz: (part) => set({ currentPart: part, userAnswers: {}, isSubmitted: false, score: 0 }),
  setAnswer: (questionId, answerIndex) => 
    set((state) => ({
      userAnswers: { ...state.userAnswers, [questionId]: answerIndex }
    })),
  submitQuiz: (totalCorrect) => set({ isSubmitted: true, score: totalCorrect }),
  resetQuiz: () => set({ currentPart: null, userAnswers: {}, isSubmitted: false, score: 0 })
}));
