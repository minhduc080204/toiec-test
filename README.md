You are a senior frontend engineer. Build a complete TOEIC learning website using React + TypeScript + Tailwind Css.

⚠️ Constraints:
- NO backend
- NO database
- ALL data must be stored in local JSON files
- AI Chatbox ONLY calls an external API endpoint (I will implement later using n8n)
- Code must be clean, scalable, and production-ready

--------------------------------------------------
🎯 PROJECT GOAL
Build a TOEIC learning system with:
- Practice (Part 5, 6, 7)
- Result & explanation
- AI Chatbot (UI only + API integration placeholder)

--------------------------------------------------
🧱 TECH STACK
- React + TypeScript (Vite)
- Zustand (state management)
- React Router
- TailwindCSS
- Axios

--------------------------------------------------
📁 FOLDER STRUCTURE

Create this structure:

src/
 ├── assets/
 ├── components/
 │    ├── ui/
 │    ├── layout/
 │    ├── quiz/
 │    ├── chatbot/
 ├── pages/
 │    ├── Home.tsx
 │    ├── Login.tsx
 │    ├── Register.tsx
 │    ├── Practice.tsx
 │    ├── Result.tsx
 │    ├── Chatbot.tsx
 ├── routes/
 │    └── index.tsx
 ├── store/
 │    ├── authStore.ts
 │    ├── quizStore.ts
 ├── services/
 │    ├── api.ts
 │    ├── chatbotService.ts
 ├── data/
 │    ├── part5.json
 │    ├── part6.json
 │    ├── part7.json
 ├── types/
 │    ├── index.ts
 ├── utils/
 │    ├── helpers.ts
 ├── App.tsx
 ├── main.tsx

--------------------------------------------------
📊 SAMPLE DATA (IMPORTANT)

Generate sample TOEIC questions JSON.

Example: part5.json

[
  {
    "id": 1,
    "question": "She ___ to the office every day.",
    "options": ["go", "goes", "going", "gone"],
    "correctAnswer": 1,
    "explanation": "Use 'goes' because subject is third person singular."
  }
]

Example: part6 (paragraph style)
Example: part7 (reading comprehension)

--------------------------------------------------
🔐 AUTHENTICATION (FAKE)

- Store user in localStorage
- authStore handles:
  - login
  - register
  - logout
  - persist session

--------------------------------------------------
📝 PRACTICE FEATURE

Practice.tsx must:
- Select Part (5,6,7)
- Load questions from JSON
- Display questions
- Allow selecting answers
- Submit quiz

quizStore:
- store answers
- calculate score

--------------------------------------------------
📊 RESULT PAGE

- Show score
- Show correct/incorrect answers
- Show explanation for each question

--------------------------------------------------
🤖 AI CHATBOT

Chatbot UI includes:
- Chat window
- Input box
- Send button

chatbotService.ts:
- call API endpoint (placeholder)

Example:

POST /api/chat

{
  "message": "Explain this question..."
}

Return mock response if API not available

--------------------------------------------------
🎨 UI REQUIREMENTS

- Clean modern UI (Tailwind)
- Responsive
- Components reusable
- Use card layout for questions
- Highlight correct/wrong answers

--------------------------------------------------
⚙️ EXTRA FEATURES

- Timer (optional)
- Progress indicator
- Dark mode (optional)

--------------------------------------------------
📦 OUTPUT REQUIREMENTS

- Generate FULL code
- Include:
  - all components
  - sample data files
  - stores
  - routing
- Make sure project runs with:
  npm install
  npm run dev

--------------------------------------------------
💡 IMPORTANT

- Keep code modular
- Use TypeScript strictly
- Avoid any backend logic
- All logic must run on frontend

--------------------------------------------------
🎯 FINAL RESULT

A fully working TOEIC practice website with:
- Authentication (local)
- Practice system
- Result system
- AI chatbot UI ready for API integration
