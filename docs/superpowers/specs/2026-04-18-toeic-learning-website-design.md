# TOEIC Learning Website Design Specification

## Overview
A frontend-only Single Page Application (SPA) designed to help users practice TOEIC reading sections (Parts 5, 6, and 7). The platform simulates test environments while offering immediate, detailed feedback and explanations after each set. It features a modern, educational aesthetic and includes a persistent AI assistant for answering specific questions via a mock API.

## Core Features & Scope
1. **Authentication (Local)**:
   - Users can register, log in, and log out.
   - Credentials and session state are persisted purely via `localStorage` on the client side. No real backend is involved.
2. **Dashboard**:
   - Displays user greeting.
   - Provides entry points to start practice sessions for Part 5, Part 6, and Part 7.
3. **Practice Module**:
   - **Data**: Questions are loaded statically from `src/data/part5.json`, `part6.json`, and `part7.json`.
   - **Flow**: "Full Test Mode" - users answer all questions in a chosen set/part before submitting.
   - **Structure**:
     - Part 5: Independent sentence completion questions.
     - Part 6 & 7: Reading passages paired with multiple questions.
4. **Results & Explanations**:
   - After submission, users see a summary score (e.g., "7/10").
   - Detailed breakdown showing exactly which answers were correct/incorrect, alongside pre-written explanations from the JSON data.
5. **AI Chatbot Integration**:
   - A persistent, floating chat bubble on all screens.
   - Users can type questions into a small chat window.
   - The chatbot uses a placeholder service (`chatbotService.ts`) to return mock responses (e.g., "I'm an AI assistant. I'll explain this soon!"). It's architected to easily swap out for an external n8n API endpoint later.

## Architecture & Technology Stack
* **Framework**: React 19 + TypeScript + Vite.
* **Routing**: React Router 7 for client-side navigation (`/`, `/login`, `/register`, `/practice/:part`, `/result`).
* **State Management**: Zustand for managing global UI state, authentication status (`authStore`), and active practice session progress (`quizStore`).
* **Styling**: Tailwind CSS, utilizing an "Education Platform" style (vibrant colors like green/orange, rounded corners, modern look).
* **Data Fetching**: Axios is configured but primarily used to mock the AI Chatbot POST request, as all TOEIC data is static JSON.

## Components & Data Flow
1. **Data Layer (`src/data/`)**:
   - `part5.json`: `[ { id, question, options[], correctAnswer, explanation } ]`
   - `part6.json` / `part7.json`: `[ { id, passage, questions: [ { id, question, options[], correctAnswer, explanation } ] } ]`
2. **State Stores (`src/store/`)**:
   - `authStore`: `{ user: { name }, login(name), logout() }`
   - `quizStore`: `{ currentPart, questions, userAnswers, setAnswer(qId, answerIndex), submitQuiz(), score }`
3. **UI Components**:
   - **Layout**: `Navbar`, `Footer`, `FloatingChatbot`.
   - **Quiz Components**: `QuestionCard`, `PassageCard`.
   - **Pages**: `Home`, `Login`, `Register`, `Practice`, `Result`.

## Error Handling & Edge Cases
* **Missing Data**: If a JSON file fails to load or is empty, the UI displays a friendly error state ("Questions are currently unavailable").
* **Incomplete Submission**: If a user clicks "Submit" without answering all questions, a prompt will warn them they have unanswered items, but they can still proceed if they choose to.
* **Chatbot Offline**: If the mock API request fails, the chatbot UI displays a fallback message indicating it's temporarily disconnected.

## Future Extensibility
* The `chatbotService.ts` function currently resolves a hardcoded Promise. To connect the real AI, the user only needs to swap the Promise with a `fetch`/`axios` call to their n8n webhook.
* Local authentication logic is siloed in `authStore.ts`, making it straightforward to replace `localStorage` with a real JWT auth flow later.
