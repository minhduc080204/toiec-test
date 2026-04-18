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
