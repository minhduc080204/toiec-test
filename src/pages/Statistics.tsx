import { useStatsStore } from '../store/statsStore';

export const Statistics = () => {
  const { history, clearHistory } = useStatsStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-bold text-gray-900">Score Statistics</h2>
        {history.length > 0 && (
          <button 
            onClick={() => {
              if (window.confirm('Clear all history?')) clearHistory();
            }}
            className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No attempts yet. Take a test to see your history!</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {history.map((attempt) => (
              <li key={attempt.id} className="py-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-800">{attempt.examTitle}</h4>
                  <p className="text-sm text-gray-500">
                    Parts: {attempt.parts.join(', ').replace(/part/g, 'P')} • {new Date(attempt.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-xl font-extrabold text-green-600">
                  {attempt.score} / {attempt.total}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
