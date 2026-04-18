import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { useStatsStore } from '../store/statsStore';
import { QuestionCard } from '../components/quiz/QuestionCard';
import type { PassageQuestion, ExamData } from '../types';

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, isSubmitted, resetQuiz } = useQuizStore();
  const addAttempt = useStatsStore(state => state.addAttempt);
  
  const examData = location.state?.examData as ExamData;
  const parts = location.state?.parts as string[];
  const savedRef = useRef(false);

  useEffect(() => {
    if (isSubmitted && examData && parts && !savedRef.current) {
      savedRef.current = true;
      let total = 0;
      if (parts.includes('part5')) total += examData.part5.length;
      if (parts.includes('part6')) examData.part6.forEach(p => total += p.questions.length);
      if (parts.includes('part7')) examData.part7.forEach(p => total += p.questions.length);

      addAttempt({
        examId: examData.id,
        examTitle: examData.title,
        parts: parts,
        score: score,
        total: total
      });
    }
  }, [isSubmitted, examData, parts, score, addAttempt]);

  if (!isSubmitted || !examData) {
    return <Navigate to="/" replace />;
  }

  let totalQuestions = 0;
  if (parts.includes('part5')) totalQuestions += examData.part5.length;
  if (parts.includes('part6')) examData.part6.forEach(p => totalQuestions += p.questions.length);
  if (parts.includes('part7')) examData.part7.forEach(p => totalQuestions += p.questions.length);

  const handleFinish = () => {
    resetQuiz();
    navigate('/statistics');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Exam Complete!</h1>
        <div className="text-5xl font-extrabold text-green-600 my-4">
          {score} / {totalQuestions}
        </div>
        <p className="text-gray-500 mb-6">Review your answers and explanations below.</p>
        <button 
          onClick={handleFinish}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition font-medium cursor-pointer"
        >
          View Statistics
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Detailed Review</h2>
        
        {parts.includes('part5') && examData.part5.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-blue-600">Part 5</h3>
            {examData.part5.map(q => <QuestionCard key={q.id} question={q} showResult={true} />)}
          </div>
        )}

        {(['part6', 'part7'] as const).map(part => {
          if (!parts.includes(part) || examData[part].length === 0) return null;
          return (
            <div key={part} className="mb-10">
              <h3 className="text-xl font-bold border-b pb-2 mb-4 text-orange-600">
                {part === 'part6' ? 'Part 6' : 'Part 7'}
              </h3>
              {examData[part].map((item: PassageQuestion) => (
                <div key={item.id} className="mb-8 pb-6 border-b border-gray-100 last:border-0">
                  <div className="bg-gray-100 p-4 rounded-md mb-6 whitespace-pre-wrap font-serif text-sm">
                    {item.passage}
                  </div>
                  {item.questions.map(q => <QuestionCard key={q.id} question={q} showResult={true} />)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
