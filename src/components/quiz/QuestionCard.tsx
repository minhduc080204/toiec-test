import { Question } from '../../types';
import { useQuizStore } from '../../store/quizStore';

interface Props {
  question: Question;
  showResult?: boolean;
}

export const QuestionCard = ({ question, showResult = false }: Props) => {
  const { userAnswers, setAnswer } = useQuizStore();
  const selectedAnswer = userAnswers[question.id];

  return (
    <div className="mb-6 p-5 border border-gray-100 rounded-lg bg-gray-50">
      <p className="text-gray-800 font-medium mb-4">
        {question.id}. {question.question}
      </p>
      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = question.correctAnswer === idx;
          
          let btnClass = "w-full text-left px-4 py-3 rounded-md border transition ";
          
          if (showResult) {
            if (isCorrect) {
              btnClass += "bg-green-100 border-green-500 text-green-800";
            } else if (isSelected && !isCorrect) {
              btnClass += "bg-red-100 border-red-500 text-red-800";
            } else {
              btnClass += "bg-white border-gray-200 opacity-50";
            }
          } else {
            btnClass += isSelected 
              ? "bg-green-50 border-green-500 text-green-700" 
              : "bg-white border-gray-200 hover:border-green-300";
          }

          return (
            <button
              key={idx}
              disabled={showResult}
              onClick={() => setAnswer(question.id, idx)}
              className={btnClass}
            >
              <span className="inline-block w-6 font-medium">
                {String.fromCharCode(65 + idx)}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      
      {showResult && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-800">
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
};
