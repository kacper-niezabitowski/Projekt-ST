// LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from './Navbar'; // Import the Navbar component
import './LoginForm.css'; // Add styling for the login form
import { useTheme } from './ThemeContext';

const LoginForm = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkMode } = useTheme();

  const handleLogin = () => {
    // Authentication logic can be added here
    // For this example, the onLogin function is called when the "Login" button is clicked
    onLogin(username);
  };

  const handleRegister = () => {
    // Registration logic can be added here
    // For this example, the onRegister function is called when the "Register" button is clicked
    //onRegister();
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div>
        {/* Render the Navbar component */}
        <Navbar />

        {/* Render the login form */}
        <div className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
          <div>
            {/* Use Link to navigate to the /register page */}
            <Link to="/register">
              <button onClick={handleRegister}>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
