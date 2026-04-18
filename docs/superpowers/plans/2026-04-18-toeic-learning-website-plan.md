# TOEIC Learning Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a frontend-only TOEIC learning platform with static JSON data, local auth, practice tests, and a mock AI chatbot.

**Architecture:** React 19 SPA using Vite. Zustand for state management, React Router 7 for navigation. Tailwind CSS for styling. Data is loaded from local static JSON files.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Axios, Lucide React (icons).

---

### Task 1: Project Setup and Dependencies

**Files:**
- Modify: `package.json`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Install dependencies**

Run: `npm install react-router zustand axios lucide-react`
Expected: Installation completes successfully.

- [ ] **Step 2: Set up base routing in App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div data-testid="home">Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: Ensure main.tsx renders App**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 4: Verify build works**

Run: `npm run build`
Expected: Build completes successfully without errors.

- [ ] **Step 5: Commit changes**

```bash
git add package.json package-lock.json src/App.tsx src/main.tsx
git commit -m "chore: setup dependencies and base routing"
```

### Task 2: Define Types and Mock Data

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/part5.json`
- Create: `src/data/part6.json`
- Create: `src/data/part7.json`

- [ ] **Step 1: Define TypeScript interfaces**

```typescript
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
```

- [ ] **Step 2: Create Part 5 sample data**

```json
[
  {
    "id": 1,
    "question": "The manager ___ to the office every day.",
    "options": ["go", "goes", "going", "gone"],
    "correctAnswer": 1,
    "explanation": "Use 'goes' because the subject 'The manager' is third person singular."
  },
  {
    "id": 2,
    "question": "Please submit your report ___ Friday.",
    "options": ["in", "on", "by", "at"],
    "correctAnswer": 2,
    "explanation": "'by' indicates a deadline."
  }
]
```

- [ ] **Step 3: Create Part 6 sample data**

```json
[
  {
    "id": 101,
    "passage": "Dear Mr. Smith,\n\nWe are pleased to inform you that your application for the marketing position has been ___(1)___. Our team was very impressed with your background. Please let us know ___(2)___ you are available for an interview next week.\n\nSincerely,\nHR Dept",
    "questions": [
      {
        "id": 1011,
        "question": "Blank (1)",
        "options": ["accept", "accepting", "accepted", "acceptable"],
        "correctAnswer": 2,
        "explanation": "Passive voice 'has been accepted'."
      },
      {
        "id": 1012,
        "question": "Blank (2)",
        "options": ["when", "who", "what", "which"],
        "correctAnswer": 0,
        "explanation": "'when' refers to time availability."
      }
    ]
  }
]
```

- [ ] **Step 4: Create Part 7 sample data**

```json
[
  {
    "id": 201,
    "passage": "NOTICE TO ALL EMPLOYEES\n\nThe staff cafeteria will be closed for renovations from Monday, October 10th to Friday, October 14th. During this time, a temporary coffee cart will be available in the main lobby from 8:00 AM to 2:00 PM. We apologize for the inconvenience and look forward to opening our new, expanded dining area on October 17th.",
    "questions": [
      {
        "id": 2011,
        "question": "How long will the cafeteria be closed?",
        "options": ["Three days", "Five days", "One week", "Two weeks"],
        "correctAnswer": 1,
        "explanation": "From Monday to Friday is five days."
      },
      {
        "id": 2012,
        "question": "What is provided as an alternative?",
        "options": ["A food truck outside", "A coffee cart in the lobby", "Free lunch vouchers", "Vending machines"],
        "correctAnswer": 1,
        "explanation": "The notice states a temporary coffee cart will be available in the main lobby."
      }
    ]
  }
]
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 6: Commit changes**

```bash
git add src/types/index.ts src/data/part5.json src/data/part6.json src/data/part7.json
git commit -m "feat: define types and sample data"
```

### Task 3: State Management (Zustand)

**Files:**
- Create: `src/store/authStore.ts`
- Create: `src/store/quizStore.ts`

- [ ] **Step 1: Implement authStore**

```typescript
import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Try to load from localStorage initially
  const storedUser = localStorage.getItem('toeic_user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    login: (username) => {
      const newUser = { username };
      localStorage.setItem('toeic_user', JSON.stringify(newUser));
      set({ user: newUser });
    },
    logout: () => {
      localStorage.removeItem('toeic_user');
      set({ user: null });
    }
  };
});
```

- [ ] **Step 2: Implement quizStore**

```typescript
import { create } from 'zustand';

interface QuizState {
  currentPart: string | null;
  userAnswers: Record<number, number>; // questionId -> selectedOptionIndex
  isSubmitted: boolean;
  score: number;
  startQuiz: (part: string) => void;
  setAnswer: (questionId: number, answerIndex: number) => void;
  submitQuiz: (totalCorrect: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentPart: null,
  userAnswers: {},
  isSubmitted: false,
  score: 0,
  startQuiz: (part) => set({ currentPart: part, userAnswers: {}, isSubmitted: false, score: 0 }),
  setAnswer: (questionId, answerIndex) => 
    set((state) => ({
      userAnswers: { ...state.userAnswers, [questionId]: answerIndex }
    })),
  submitQuiz: (totalCorrect) => set({ isSubmitted: true, score: totalCorrect }),
  resetQuiz: () => set({ currentPart: null, userAnswers: {}, isSubmitted: false, score: 0 })
}));
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build completes successfully.

- [ ] **Step 4: Commit changes**

```bash
git add src/store/
git commit -m "feat: implement zustand stores"
```

### Task 4: Layout Components

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Layout.tsx`

- [ ] **Step 1: Create Navbar component**

```tsx
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import { BookOpen } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-green-600 font-bold text-xl">
          <BookOpen className="w-6 h-6" />
          <span>TOEIC Master</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600">Hi, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="text-sm px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
```

- [ ] **Step 2: Create main Layout wrapper**

```tsx
import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};
```

- [ ] **Step 3: Update App.tsx to use Layout**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div data-testid="home">Home Page</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 5: Commit changes**

```bash
git add src/components/layout/ src/App.tsx
git commit -m "feat: implement layout and navbar"
```

### Task 5: Authentication Pages

**Files:**
- Create: `src/pages/Login.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Login page (handles both login and pseudo-register)**

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

export const Login = () => {
  const [username, setUsername] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to TOEIC Master</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Enter your name to start"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-medium py-2.5 rounded-md hover:bg-green-700 transition"
        >
          Enter Platform
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-500">
        No account needed. Just enter a name to track your session locally.
      </p>
    </div>
  );
};
```

- [ ] **Step 2: Add Login route to App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div data-testid="home">Home Page</div>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit changes**

```bash
git add src/pages/Login.tsx src/App.tsx
git commit -m "feat: implement login page"
```

### Task 6: Home / Dashboard Page

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Home page**

```tsx
import { Link, Navigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { BookOpen, FileText, Layers } from 'lucide-react';

export const Home = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const parts = [
    { id: 'part5', title: 'Part 5', desc: 'Incomplete Sentences', icon: <FileText className="w-6 h-6 text-blue-500" /> },
    { id: 'part6', title: 'Part 6', desc: 'Text Completion', icon: <Layers className="w-6 h-6 text-orange-500" /> },
    { id: 'part7', title: 'Part 7', desc: 'Reading Comprehension', icon: <BookOpen className="w-6 h-6 text-green-500" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Select a section to begin your practice.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div key={part.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {part.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{part.title}</h3>
            <p className="text-gray-500 mb-6">{part.desc}</p>
            <Link
              to={`/practice/${part.id}`}
              className="inline-block w-full text-center bg-gray-50 text-gray-700 font-medium py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
            >
              Start Practice
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Update App.tsx to use Home page**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit changes**

```bash
git add src/pages/Home.tsx src/App.tsx
git commit -m "feat: implement dashboard home page"
```

### Task 7: Practice Component Boilerplate & Route

**Files:**
- Create: `src/pages/Practice.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Practice page container**

```tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';

export const Practice = () => {
  const { part } = useParams<{ part: string }>();
  const navigate = useNavigate();
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!part || !['part5', 'part6', 'part7'].includes(part)) {
      navigate('/');
      return;
    }
    
    startQuiz(part);
    
    // Dynamic import for JSON files based on route
    import(`../data/${part}.json`)
      .then((module) => {
        setData(module.default);
      })
      .catch((err) => {
        console.error('Failed to load practice data', err);
      });
  }, [part, navigate, startQuiz]);

  if (data.length === 0) return <div className="text-center py-12">Loading questions...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 capitalize">{part?.replace('part', 'Part ')} Practice</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p>Loaded {data.length} items. Interface coming soon.</p>
        <button 
          onClick={() => navigate('/result')}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Mock Submit
        </button>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Add Practice and Result (mock) routes to App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Practice } from './pages/Practice';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/practice/:part" element={<Practice />} />
          <Route path="/result" element={<div data-testid="result">Result Page</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit changes**

```bash
git add src/pages/Practice.tsx src/App.tsx
git commit -m "feat: setup practice page routing and data loading"
```

### Task 8: Practice Module - Question Card Component

**Files:**
- Create: `src/components/quiz/QuestionCard.tsx`

- [ ] **Step 1: Implement QuestionCard**

```tsx
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
```

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: Compiles cleanly.

- [ ] **Step 3: Commit changes**

```bash
git add src/components/quiz/QuestionCard.tsx
git commit -m "feat: add QuestionCard component"
```

### Task 9: Practice Module - Implementation (Full)

**Files:**
- Modify: `src/pages/Practice.tsx`

- [ ] **Step 1: Update Practice.tsx to render full question lists and handle submit**

```tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { Question, PassageQuestion } from '../types';

export const Practice = () => {
  const { part } = useParams<{ part: string }>();
  const navigate = useNavigate();
  const { startQuiz, submitQuiz, userAnswers } = useQuizStore();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!part || !['part5', 'part6', 'part7'].includes(part)) {
      navigate('/');
      return;
    }
    startQuiz(part);
    import(`../data/${part}.json`)
      .then((module) => setData(module.default))
      .catch((err) => console.error('Data load error', err));
  }, [part, navigate, startQuiz]);

  const calculateScore = () => {
    let totalCorrect = 0;
    if (part === 'part5') {
      data.forEach((q: Question) => {
        if (userAnswers[q.id] === q.correctAnswer) totalCorrect++;
      });
    } else {
      data.forEach((p: PassageQuestion) => {
        p.questions.forEach((q: Question) => {
          if (userAnswers[q.id] === q.correctAnswer) totalCorrect++;
        });
      });
    }
    return totalCorrect;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    submitQuiz(score);
    navigate('/result', { state: { data } });
  };

  if (data.length === 0) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h2 className="text-2xl font-bold mb-6 capitalize">{part?.replace('part', 'Part ')} Practice</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {part === 'part5' ? (
          data.map((q: Question) => <QuestionCard key={q.id} question={q} />)
        ) : (
          data.map((item: PassageQuestion) => (
            <div key={item.id} className="mb-10 pb-6 border-b border-gray-200">
              <div className="bg-gray-100 p-4 rounded-md mb-6 whitespace-pre-wrap font-serif text-sm">
                {item.passage}
              </div>
              {item.questions.map((q) => <QuestionCard key={q.id} question={q} />)}
            </div>
          ))
        )}
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSubmit}
            className="bg-green-600 text-white font-medium px-8 py-3 rounded-md hover:bg-green-700 transition"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 3: Commit changes**

```bash
git add src/pages/Practice.tsx
git commit -m "feat: complete practice rendering and submission"
```

### Task 10: Result Page Implementation

**Files:**
- Create: `src/pages/Result.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Result page**

```tsx
import { useLocation, useNavigate, Navigate } from 'react-router';
import { useQuizStore } from '../store/quizStore';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { Question, PassageQuestion } from '../types';

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
              {item.questions.map((q) => <QuestionCard key={q.id} question={q} showResult={true} />)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Update App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Practice } from './pages/Practice';
import { Result } from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/practice/:part" element={<Practice />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 4: Commit changes**

```bash
git add src/pages/Result.tsx src/App.tsx
git commit -m "feat: implement result page with detailed review"
```

### Task 11: AI Chatbot Component and Service

**Files:**
- Create: `src/services/chatbotService.ts`
- Create: `src/components/chatbot/FloatingChatbot.tsx`
- Modify: `src/components/layout/Layout.tsx`

- [ ] **Step 1: Create Chatbot Service mock**

```typescript
// Uses axios for future extensibility, but mocks the response for now
import axios from 'axios';

export const askChatbot = async (message: string): Promise<string> => {
  console.log(`Sending to n8n webhook (mock): ${message}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock response
  return `I am your AI assistant! This is a mock response. You asked: "${message}". Soon, I will be connected to an n8n endpoint to provide real TOEIC explanations.`;
};
```

- [ ] **Step 2: Create FloatingChatbot component**

```tsx
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { askChatbot } from '../../services/chatbotService';

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! Ask me anything about the questions.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const reply = await askChatbot(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I am disconnected right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 h-96 flex flex-col mb-4 overflow-hidden">
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <span className="font-medium flex items-center gap-2">
              <MessageCircle size={18} /> AI Assistant
            </span>
            <button onClick={() => setIsOpen(false)} className="hover:text-green-200">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`p-2 rounded-lg max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-green-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs self-start">Typing...</div>}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 flex gap-2 bg-white">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:border-green-500"
            />
            <button type="submit" disabled={loading} className="bg-green-600 text-white p-1.5 rounded-md hover:bg-green-700 disabled:opacity-50">
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};
```

- [ ] **Step 3: Add FloatingChatbot to Layout**

```tsx
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { FloatingChatbot } from '../chatbot/FloatingChatbot';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
      <FloatingChatbot />
    </div>
  );
};
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build passes.

- [ ] **Step 5: Commit changes**

```bash
git add src/services/ src/components/chatbot/ src/components/layout/Layout.tsx
git commit -m "feat: integrate AI chatbot mock service and UI"
```

---
