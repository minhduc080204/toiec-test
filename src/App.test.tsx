import { render, screen } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

// Mock the auth store to simulate a logged-in user
vi.mock('./store/authStore', () => ({
  useAuthStore: vi.fn((selector) => {
    const state = {
      user: { username: 'testuser' },
      login: vi.fn(),
      logout: vi.fn(),
    };
    return selector ? selector(state) : state;
  }),
}));

describe('App', () => {
  it('renders home page when logged in', () => {
    render(<App />);
    expect(screen.getByText(/Available Exams/i)).toBeInTheDocument();
  });
});
