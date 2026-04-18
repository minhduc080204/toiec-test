import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Try to load from localStorage initially
  const storedUser = localStorage.getItem('toeic_user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    login: (username) => {
      const newUser = { username };
      localStorage.setItem('toeic_user', JSON.stringify(newUser));
      set({ user: newUser });
    },
    logout: () => {
      localStorage.removeItem('toeic_user');
      set({ user: null });
    }
  };
});
