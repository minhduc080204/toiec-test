import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { QuestionCard } from '../components/quiz/QuestionCard';
import type { Question, PassageQuestion } from '../types';

export const Practice = () => {
  const { part } = useParams<{ part: string }>();
  const navigate = useNavigate();
  const { startQuiz, submitQuiz, userAnswers } = useQuizStore();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!part || !['part5', 'part6', 'part7'].includes(part)) {
      navigate('/');
      return;
    }
    startQuiz(part);
    import(`../data/${part}.json`)
      .then((module) => setData(module.default))
      .catch((err) => console.error('Data load error', err));
  }, [part, navigate, startQuiz]);

  const calculateScore = () => {
    let totalCorrect = 0;
    if (part === 'part5') {
      data.forEach((q: Question) => {
        if (userAnswers[q.id] === q.correctAnswer) totalCorrect++;
      });
    } else {
      data.forEach((p: PassageQuestion) => {
        p.questions.forEach((q: Question) => {
          if (userAnswers[q.id] === q.correctAnswer) totalCorrect++;
        });
      });
    }
    return totalCorrect;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    submitQuiz(score);
    navigate('/result', { state: { data } });
  };

  if (data.length === 0) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h2 className="text-2xl font-bold mb-6 capitalize">{part?.replace('part', 'Part ')} Practice</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {part === 'part5' ? (
          data.map((q: Question) => <QuestionCard key={q.id} question={q} />)
        ) : (
          data.map((item: PassageQuestion) => (
            <div key={item.id} className="mb-10 pb-6 border-b border-gray-200">
              <div className="bg-gray-100 p-4 rounded-md mb-6 whitespace-pre-wrap font-serif text-sm">
                {item.passage}
              </div>
              {item.questions.map((q) => <QuestionCard key={q.id} question={q} />)}
            </div>
          ))
        )}
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSubmit}
            className="bg-green-600 text-white font-medium px-8 py-3 rounded-md hover:bg-green-700 transition"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
