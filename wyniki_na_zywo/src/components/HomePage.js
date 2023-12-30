// Homepage.js

import React, { useState } from 'react';
import Navbar from './Navbar';
import LoginForm from './LoginForm';
import FootballDataComponent from './FootballDataComponent';
import './HomePage.css'; // Importuj plik ze stylami

const Homepage = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar openLoginForm={openLoginForm} />
      <div className="homepage-content">
        <h1>Witaj przybyszu</h1>
        <p></p>
        <FootballDataComponent />
      </div>
      {isLoginFormOpen && (
        <div style={{ alignSelf: 'flex-end' }}>
          <LoginForm onClose={closeLoginForm} />
        </div>
      )}
    </div>
  );
};

export default Homepage;
