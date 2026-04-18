import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ExamSetup } from './pages/ExamSetup';
import { Practice } from './pages/Practice';
import { Result } from './pages/Result';
import { Statistics } from './pages/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exam/:examId/setup" element={<ExamSetup />} />
          <Route path="/practice/:examId" element={<Practice />} />
          <Route path="/result" element={<Result />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
