import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { QuestionCard } from '../components/quiz/QuestionCard';
import type { PassageQuestion, ExamData } from '../types';

export const Practice = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const partsToPractice = location.state?.parts || ['part5', 'part6', 'part7'];
  
  const { startQuiz, submitQuiz, userAnswers } = useQuizStore();
  const [examData, setExamData] = useState<ExamData | null>(null);

  useEffect(() => {
    if (!examId) return navigate('/');
    
    import(`../data/exams/${examId}.json`)
      .then((mod) => {
        const data = mod.default || mod;
        setExamData(data);
        startQuiz(examId, partsToPractice);
      })
      .catch(() => navigate('/'));
  }, [examId, navigate, startQuiz]);

  const calculateScore = () => {
    if (!examData) return 0;
    let totalCorrect = 0;
    
    if (partsToPractice.includes('part5')) {
      examData.part5.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) totalCorrect++;
      });
    }
    
    ['part6', 'part7'].forEach(part => {
      if (partsToPractice.includes(part)) {
        (examData[part as 'part6'|'part7']).forEach(p => {
          p.questions.forEach(q => {
            if (userAnswers[q.id] === q.correctAnswer) totalCorrect++;
          });
        });
      }
    });
    
    return totalCorrect;
  };

  const handleSubmit = () => {
    if (!examData) return;
    const score = calculateScore();
    submitQuiz(score);
    navigate('/result', { state: { examData, parts: partsToPractice } });
  };

  if (!examData) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h2 className="text-2xl font-bold mb-6">{examData.title}</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {partsToPractice.includes('part5') && examData.part5.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold border-b pb-2 mb-4 text-blue-600">Part 5: Incomplete Sentences</h3>
            {examData.part5.map(q => <QuestionCard key={q.id} question={q} />)}
          </div>
        )}

        {(['part6', 'part7'] as const).map(part => {
          if (!partsToPractice.includes(part) || examData[part].length === 0) return null;
          return (
            <div key={part} className="mb-10">
              <h3 className="text-xl font-bold border-b pb-2 mb-4 text-orange-600">
                {part === 'part6' ? 'Part 6: Text Completion' : 'Part 7: Reading Comprehension'}
              </h3>
              {examData[part].map((item: PassageQuestion) => (
                <div key={item.id} className="mb-8 pb-6 border-b border-gray-100 last:border-0">
                  <div className="bg-gray-100 p-4 rounded-md mb-6 whitespace-pre-wrap font-serif text-sm">
                    {item.passage}
                  </div>
                  {item.questions.map(q => <QuestionCard key={q.id} question={q} />)}
                </div>
              ))}
            </div>
          );
        })}
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSubmit}
            className="bg-green-600 text-white font-medium px-8 py-3 rounded-md hover:bg-green-700 transition cursor-pointer"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};
