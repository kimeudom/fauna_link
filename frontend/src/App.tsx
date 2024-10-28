// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login Page */}
        <Route path="/signup" element={<SignUp />} /> {/* Sign Up Page */}
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
