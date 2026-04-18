import { useQuizStore } from '../../store/quizStore';
import type { ExamData, PassageQuestion, Question } from '../../types';

interface Props {
  examData: ExamData;
  parts: string[];
}

export const QuestionNavigator = ({ examData, parts }: Props) => {
  const { userAnswers } = useQuizStore();

  const scrollToQuestion = (id: number) => {
    const el = document.getElementById(`question-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderGrid = (questions: Question[]) => {
    return (
      <div className="grid grid-cols-5 gap-2 mt-2 mb-4">
        {questions.map(q => {
          const isAnswered = userAnswers[q.id] !== undefined;
          return (
            <button
              key={q.id}
              onClick={() => scrollToQuestion(q.id)}
              className={`w-9 h-9 rounded text-xs font-medium flex items-center justify-center transition-colors border cursor-pointer ${
                isAnswered 
                  ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-green-500 hover:text-green-600'
              }`}
            >
              {q.id}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto custom-scrollbar">
      <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
        <span>Checklist</span>
        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {Object.keys(userAnswers).length} / 100
        </span>
      </h3>
      
      {parts.includes('part5') && examData.part5.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider">Part 5</h4>
          {renderGrid(examData.part5)}
        </div>
      )}

      {(['part6', 'part7'] as const).map(part => {
        if (!parts.includes(part) || examData[part].length === 0) return null;
        
        // Flatten questions for the grid
        const allQuestionsInPart: Question[] = [];
        examData[part].forEach((p: PassageQuestion) => {
          p.questions.forEach((q: Question) => {
            allQuestionsInPart.push(q);
          });
        });

        return (
          <div key={part}>
            <h4 className="text-sm font-bold text-orange-600 mt-4 uppercase tracking-wider">
              {part === 'part6' ? 'Part 6' : 'Part 7'}
            </h4>
            {renderGrid(allQuestionsInPart)}
          </div>
        );
      })}
    </div>
  );
};
