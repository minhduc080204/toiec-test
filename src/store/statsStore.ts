import { create } from 'zustand';
import type { AttemptHistory } from '../types';

interface StatsState {
  history: AttemptHistory[];
  addAttempt: (attempt: Omit<AttemptHistory, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

export const useStatsStore = create<StatsState>((set) => {
  const storedHistory = localStorage.getItem('toeic_stats');
  const initialHistory = storedHistory ? JSON.parse(storedHistory) : [];

  return {
    history: initialHistory,
    addAttempt: (attemptData) => {
      set((state) => {
        const newAttempt: AttemptHistory = {
          ...attemptData,
          id: Math.random().toString(36).substring(2, 9),
          date: new Date().toISOString(),
        };
        const newHistory = [newAttempt, ...state.history];
        localStorage.setItem('toeic_stats', JSON.stringify(newHistory));
        return { history: newHistory };
      });
    },
    clearHistory: () => {
      localStorage.removeItem('toeic_stats');
      set({ history: [] });
    }
  };
});
