import { Link, Navigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { BookOpen, FileText, Layers } from 'lucide-react';

export const Home = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const parts = [
    { id: 'part5', title: 'Part 5', desc: 'Incomplete Sentences', icon: <FileText className="w-6 h-6 text-blue-500" /> },
    { id: 'part6', title: 'Part 6', desc: 'Text Completion', icon: <Layers className="w-6 h-6 text-orange-500" /> },
    { id: 'part7', title: 'Part 7', desc: 'Reading Comprehension', icon: <BookOpen className="w-6 h-6 text-green-500" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Select a section to begin your practice.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div key={part.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {part.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{part.title}</h3>
            <p className="text-gray-500 mb-6">{part.desc}</p>
            <Link
              to={`/practice/${part.id}`}
              className="inline-block w-full text-center bg-gray-50 text-gray-700 font-medium py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
            >
              Start Practice
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
