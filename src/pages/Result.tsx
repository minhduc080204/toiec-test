import { useLocation, useNavigate, Navigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { QuestionCard } from '../components/quiz/QuestionCard';
import type { Question, PassageQuestion } from '../types';

export const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPart, score, isSubmitted, resetQuiz } = useQuizStore();
  const data = location.state?.data;

  if (!isSubmitted || !data) {
    return <Navigate to="/" replace />;
  }

  // Count total questions
  let totalQuestions = 0;
  if (currentPart === 'part5') {
    totalQuestions = data.length;
  } else {
    data.forEach((p: PassageQuestion) => {
      totalQuestions += p.questions.length;
    });
  }

  const handleFinish = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Complete!</h1>
        <div className="text-5xl font-extrabold text-green-600 my-4">
          {score} / {totalQuestions}
        </div>
        <p className="text-gray-500 mb-6">Review your answers and explanations below.</p>
        <button 
          onClick={handleFinish}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition font-medium"
        >
          Return to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Detailed Review</h2>
        {currentPart === 'part5' ? (
          data.map((q: Question) => <QuestionCard key={q.id} question={q} showResult={true} />)
        ) : (
          data.map((item: PassageQuestion) => (
            <div key={item.id} className="mb-10 pb-6 border-b border-gray-200">
              <div className="bg-gray-100 p-4 rounded-md mb-6 whitespace-pre-wrap font-serif text-sm">
                {item.passage}
              </div>
              {item.questions.map((q: Question) => <QuestionCard key={q.id} question={q} showResult={true} />)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
