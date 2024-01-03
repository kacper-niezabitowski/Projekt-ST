import React from 'react';
import './UserProfile.css'; // Zaimportuj plik ze stylami profilu użytkownika
import Navbar from './Navbar';


const UserProfile = () => {
  return (
    <div className="user-profile">
        <Navbar />
        <div className="user-avatar">
            {/* Avatar lub zdjęcie profilowe */}
            <img src="link_do_zdjecia_profilowego.jpg" alt="Avatar użytkownika" />
        </div>
        <div className="user-info">
            {/* Imię i nazwisko */}
            <h2>Imię i nazwisko użytkownika</h2>
            {/* Informacje kontaktowe */}
            <p>E-mail: example@example.com</p>
            <p>Numer telefonu: +1234567890</p>
        </div>
        <div className="favorite-teams">
            {/* Ulubione drużyny lub ligi */}
            <h2>Ulubione drużyny i ligi</h2>
            <ul>
            <li>Drużyna 1</li>
            <li>Drużyna 2</li>
            <li>Liga A</li>
            </ul>
        </div>
        <div className="recent-activity">
            {/* Historia przeglądanych meczów */}
            <h2>Ostatnie przeglądane mecze</h2>
            <ul>
            <li>Mecz 1</li>
            <li>Mecz 2</li>
            <li>Mecz 3</li>
            </ul>
        </div>
      {/* Dodaj pozostałe informacje, takie jak statystyki użytkownika, zakłady, ustawienia konta, itp. */}
    </div>
  );
};

export default UserProfile;
