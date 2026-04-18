export interface User {
  username: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface PassageQuestion {
  id: number;
  passage: string;
  questions: Question[];
}
