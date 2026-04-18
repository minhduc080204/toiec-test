import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { QuestionNavigator } from '../components/quiz/QuestionNavigator';
import type { PassageQuestion, ExamData } from '../types';

export const Practice = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const partsToPractice = location.state?.parts || ['part5', 'part6', 'part7'];
  
  const { startQuiz, submitQuiz, userAnswers } = useQuizStore();
  const [examData, setExamData] = useState<ExamData | null>(null);

  useEffect(() => {
    if (!examId) {
      navigate('/');
      return;
    }
    
    const loadData = async () => {
      try {
        const mod = await import(`../data/exams/${examId}.json`);
        const data = mod.default || mod;
        setExamData(data);
        startQuiz(examId, partsToPractice);
      } catch (err) {
        console.error('Failed to load exam data', err);
        navigate('/');
      }
    };

    loadData();
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
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{examData.title}</h2>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 relative items-start">
        {/* Main Content Area */}
        <div className="flex-1 w-full lg:min-w-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            
            {partsToPractice.includes('part5') && examData.part5.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold border-b border-gray-100 pb-3 mb-6 text-blue-600 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  Part 5: Incomplete Sentences
                </h3>
                {examData.part5.map(q => <QuestionCard key={q.id} question={q} />)}
              </div>
            )}

            {(['part6', 'part7'] as const).map(part => {
              if (!partsToPractice.includes(part) || examData[part].length === 0) return null;
              const isPart6 = part === 'part6';
              return (
                <div key={part} className="mb-10">
                  <h3 className={`text-xl font-bold border-b border-gray-100 pb-3 mb-6 flex items-center gap-2 ${isPart6 ? 'text-orange-600' : 'text-green-600'}`}>
                    <span className={`w-1.5 h-6 rounded-full ${isPart6 ? 'bg-orange-600' : 'bg-green-600'}`}></span>
                    {isPart6 ? 'Part 6: Text Completion' : 'Part 7: Reading Comprehension'}
                  </h3>
                  {examData[part].map((item: PassageQuestion) => (
                    <div key={item.id} className="mb-12 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="bg-gray-50 p-6 rounded-xl mb-6 whitespace-pre-wrap font-serif text-gray-800 leading-relaxed border border-gray-100 shadow-inner">
                        {item.passage}
                      </div>
                      {item.questions.map(q => <QuestionCard key={q.id} question={q} />)}
                    </div>
                  ))}
                </div>
              );
            })}
            
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
              <button 
                onClick={handleSubmit}
                className="bg-green-600 text-white font-bold px-10 py-3.5 rounded-lg hover:bg-green-700 transition cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar Navigation */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-8">
          <QuestionNavigator examData={examData} parts={partsToPractice} />
        </aside>
      </div>
    </div>
  );
};
