import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import

import Homepage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserProfile from './components/UserProfile';
import TeamPage from './components/TeamPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes using the Route component */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/team/:teamId" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;
