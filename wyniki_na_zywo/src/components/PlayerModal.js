// PlayerModal.js
import React from 'react';
import './PlayerModal.css';
import { useTheme } from './ThemeContext';

const PlayerModal = ({ player, teamInfo, closeModal }) => {
  const { isDarkMode } = useTheme();
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();

    const hasBirthdayOccurred = (
      today.getMonth() > birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() && today.getDate() >= birthDateObj.getDate())
    );

    if (!hasBirthdayOccurred) {
      age--;
    }

    return age;
  };

  const translatePosition = (position) => {
    switch (position) {
      case 'Goalkeeper':
        return 'Bramkarz';
      case 'Defence':
        return 'Obrońca';
      case 'Midfield':
        return 'Pomocnik';
      case 'Forward':
        return 'Napastnik';
      case 'Offence':
        return 'Napastnik';
      case 'Midfielder':
        return 'Pomocnik';
      default:
        return position;
    }
  };

  const translateNationality = (nationality) => {
    const nationalityTranslations = {
      'England': 'Anglia',
      'Spain': 'Hiszpania',
      'France': 'Francja',
      'Germany':'Niemcy',
      'Italy': 'Włochy',
      'Poland':'polska',
      'Monaco':'Monako',
      'Austria': 'Austria',
      'Denmark':'Dania',
      'Finland':'Finlandia',
      'Brazil':'Brazylia',
      'Belgium':'Belgia',
    };

    return nationalityTranslations[nationality] || nationality;
  };

  const getMonthName = (month) => {
    const monthNames = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień',
      'Maj', 'Czerwiec', 'Lipiec', 'Sierpień',
      'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];

    return monthNames[month];
  };

  return (
    <div className={`modal-overlay ${isDarkMode ? 'dark-mode' : ''}`} onClick={closeModal}>
      <div className={`modal-content ${isDarkMode ? 'dark-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{player.name}</h2>
        <p>Kraj pochodzenia: {translateNationality(player.nationality)}</p>
        <p>Zespół: {teamInfo.name}</p>
        <p>Wiek: {calculateAge(player.dateOfBirth)}</p>
        <p>Pozycja: {translatePosition(player.position)}</p>
        <p>Urodziny: {new Date(player.dateOfBirth).getDate()} {getMonthName(new Date(player.dateOfBirth).getMonth())}</p>
        {/* Add more player information here */}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default PlayerModal;
