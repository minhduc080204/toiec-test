import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import { BookOpen, BarChart2 } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-green-600 font-bold text-xl">
            <BookOpen className="w-6 h-6" />
            <span>TOEIC Master</span>
          </Link>
          {user && (
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-green-600 font-medium transition">Exams</Link>
              <Link to="/statistics" className="text-gray-600 hover:text-green-600 font-medium transition flex items-center gap-1">
                <BarChart2 size={16}/> Stats
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600 hidden sm:inline">Hi, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="text-sm px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
