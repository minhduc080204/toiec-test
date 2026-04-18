export interface User {
  username: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PassageQuestion {
  id: number;
  passage: string;
  questions: Question[];
}

export interface ExamData {
  id: string;
  title: string;
  part5: Question[];
  part6: PassageQuestion[];
  part7: PassageQuestion[];
}

export interface AttemptHistory {
  id: string;
  examId: string;
  examTitle: string;
  parts: string[]; 
  score: number;
  total: number;
  date: string;
}
