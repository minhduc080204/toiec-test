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
