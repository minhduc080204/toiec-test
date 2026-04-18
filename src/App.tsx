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
