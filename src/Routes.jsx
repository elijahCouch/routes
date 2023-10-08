import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import SecondPage from './pages/SecondPage'; 
import Bitcoin from './pages/bitcoin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bitcoin" element={<Bitcoin />} />
        <Route path="/secondpage" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;

