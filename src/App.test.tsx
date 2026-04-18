import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders home page at root path', () => {
    render(<App />);
    expect(screen.getByTestId('home')).toHaveTextContent('Home');
  });
});
