import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import

import Homepage from './components/HomePage';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes using the Route component */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
