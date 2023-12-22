// RegisterForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './RegisterForm.css'; // Dodaj stylowanie dla formularza rejestracji

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = () => {
    if (password === repeatPassword) {
      onRegister({
        email,
        username,
        password,
      });
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-form">
      <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
              
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="repeatPassword">Repeat Password:</label>
        <input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <div>
          <button onClick={handleRegister}>Register</button>
        </div>
        <div>
          <Link to="/login">Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
