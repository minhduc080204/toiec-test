import { Link, Navigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { BookOpen } from 'lucide-react';

export const Home = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // List of exams (matching JSON files in src/data/exams/)
  const exams = [
    { id: 'test1', title: 'Practice Test 1', desc: 'Standard TOEIC Reading parts.' },
    { id: 'test2', title: 'Practice Test 2', desc: 'Advanced vocabulary focus.' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Available Exams</h1>
        <p className="text-gray-600 mt-2">Select an exam to configure your practice session.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{exam.title}</h3>
                <p className="text-sm text-gray-500">{exam.desc}</p>
              </div>
            </div>
            <Link
              to={`/exam/${exam.id}/setup`}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-green-600 hover:text-white transition"
            >
              Setup
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
