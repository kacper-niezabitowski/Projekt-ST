import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './TeamPage.css';
import { useTheme } from './ThemeContext';

const TeamPage = () => {
  const [teamInfo, setTeamInfo] = useState(null);
  const { teamId } = useParams();
  const { isDarkMode } = useTheme();

  console.log("Team ID:", teamId);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await axios.get(`/v4/teams/${teamId}`, {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });

        setTeamInfo(response.data);
      } catch (error) {
        console.error('Error fetching team info:', error);
      }
    };

    if (teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

  // Funkcja do obliczania wieku na podstawie daty urodzenia
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();

    // Sprawdź, czy już miał urodziny w bieżącym roku
    const hasBirthdayOccurred = (
      today.getMonth() > birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() && today.getDate() >= birthDateObj.getDate())
    );

    // Zmniejsz wiek, jeśli urodziny jeszcze nie nadeszły w bieżącym roku
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
        return 'Atak';
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
        }    
        return nationalityTranslations[nationality] || nationality;
      };


  
  const renderButtons = () => {
    return (
      <div className="team-buttons">
        <button className="team-button">Przycisk 1</button>
        <button className="team-button">Przycisk 2</button>
        <button className="team-button">Przycisk 3</button>
      </div>
    );
  };

  const renderPlayersTable = () => {
    if (!teamInfo || !teamInfo.squad) {
      return <p>No player data available.</p>;
    }

    return (
      <table className="team-page-table">
        <tbody>
          {teamInfo.squad.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{translatePosition(player.position)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Navbar />
      <div className="team-page-container">
        <div className="team-upper-container">
          {teamInfo ? (
            <>
              <div className="team-info-container">
                <img src={teamInfo.crest} alt={`${teamInfo.name} Crest`} className="team-crest" />
                <div className="team-details">
                  <h2>{teamInfo.name}</h2>
                  <p>Założony: {teamInfo.founded}</p>
                  <p>
                    Strona internetowa: <a href={teamInfo.website} target="_blank" rel="noopener noreferrer">{teamInfo.website}</a>
                  </p>
                  <p>Kraj pochodzenia: {translateNationality(teamInfo.area.name)}</p>
                </div>
              </div>
              {renderButtons()}
           {/* <div className="additional-info">
              <p>Trener: {teamInfo.coach.name} </p>
              <p>Narodowość: {teamInfo.coach.nationality}</p> 
               <p>Wiek: {calculateAge(teamInfo.coach.dateOfBirth)}</p>
              </div>*/}
            </>
          ) : (
            <p>Loading team information...</p>
          )}
        </div>
        <div className="team-container">
          {renderPlayersTable()}
        </div>
      </div>
    </div>
  );
          }
export default TeamPage;
