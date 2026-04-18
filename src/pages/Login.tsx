import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

export const Login = () => {
  const [username, setUsername] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to TOEIC Master</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Enter your name to start"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-medium py-2.5 rounded-md hover:bg-green-700 transition"
        >
          Enter Platform
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-500">
        No account needed. Just enter a name to track your session locally.
      </p>
    </div>
  );
};
