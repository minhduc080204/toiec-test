import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';

export const Practice = () => {
  const { part } = useParams<{ part: string }>();
  const navigate = useNavigate();
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!part || !['part5', 'part6', 'part7'].includes(part)) {
      navigate('/');
      return;
    }
    
    startQuiz(part);
    
    // Dynamic import for JSON files based on route
    import(`../data/${part}.json`)
      .then((module) => {
        setData(module.default);
      })
      .catch((err) => {
        console.error('Failed to load practice data', err);
      });
  }, [part, navigate, startQuiz]);

  if (data.length === 0) return <div className="text-center py-12">Loading questions...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 capitalize">{part?.replace('part', 'Part ')} Practice</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p>Loaded {data.length} items. Interface coming soon.</p>
        <button 
          onClick={() => navigate('/result')}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Mock Submit
        </button>
      </div>
    </div>
  );
};
