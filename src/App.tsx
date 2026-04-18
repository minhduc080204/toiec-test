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
