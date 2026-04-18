import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { ExamData } from '../types';

export const ExamSetup = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [examInfo, setExamInfo] = useState<ExamData | null>(null);
  
  const [selectedParts, setSelectedParts] = useState({
    part5: true,
    part6: true,
    part7: true
  });

  useEffect(() => {
    if (examId) {
      import(`../data/exams/${examId}.json`)
        .then(mod => setExamInfo(mod.default || mod))
        .catch(() => navigate('/'));
    }
  }, [examId, navigate]);

  const togglePart = (part: 'part5'|'part6'|'part7') => {
    setSelectedParts(prev => ({...prev, [part]: !prev[part]}));
  };

  const handleStart = () => {
    const partsToPractice = Object.entries(selectedParts)
      .filter(([_, isSelected]) => isSelected)
      .map(([part]) => part);
      
    if (partsToPractice.length === 0) return alert('Select at least one part.');
    
    // Pass selected parts via state
    navigate(`/practice/${examId}`, { state: { parts: partsToPractice } });
  };

  if (!examInfo) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center">Setup</h2>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800">{examInfo.title}</h3>
          <p className="text-gray-500 text-sm mt-1">Configure your practice session</p>
        </div>

        <p className="font-medium text-gray-700 mb-4">Select parts to practice:</p>
        
        <div className="space-y-3 mb-8">
          {(['part5', 'part6', 'part7'] as const).map(part => (
            <label key={part} className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition">
              <input 
                type="checkbox" 
                checked={selectedParts[part]}
                onChange={() => togglePart(part)}
                className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
              />
              <span className="font-medium text-gray-800 capitalize">
                {part.replace('part', 'Part ')}
              </span>
            </label>
          ))}
        </div>

        <button 
          onClick={handleStart}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition cursor-pointer shadow-md"
        >
          Start Practice
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full mt-3 bg-white text-gray-500 font-medium py-2 rounded-md hover:bg-gray-50 transition border border-gray-100 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
