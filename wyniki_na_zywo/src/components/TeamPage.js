import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './TeamPage.css';
import { useTheme } from './ThemeContext';
import PlayerModal from './PlayerModal';

const TeamPage = () => {
  const [teamInfo, setTeamInfo] = useState(null);
  const [currentSection, setCurrentSection] = useState('KADRA');
  const { teamId } = useParams();
  const { isDarkMode } = useTheme();
  const [teamMatches, setTeamMatches] = useState(null);
  const handleSectionChange = (section) => {
    setCurrentSection(section);  };
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const openModal = (player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  const renderGroupTable = (group) => {
    // Upewnij się, że struktura danych grupy jest poprawna
    return (
      <table className="match-table">
        <thead>
          <tr>
            <th>Pozycja</th>
            {/* ... pozostałe nagłówki ... */}
          </tr>
        </thead>
        <tbody>
          {group.table.map((team, index) => (
            <tr key={team.team.id}>
              <td>{team.position}</td>
              {/* ... pozostałe dane drużyny ... */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
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
  useEffect(() => {
    const fetchTeamMatches = async () => {
      try {
        const matchesResponse = await axios.get(`/v4/teams/${teamId}/matches?status=SCHEDULED`, {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });
        setTeamMatches(matchesResponse.data.matches);
      } catch (error) {
        console.error('Error fetching team matches:', error);
      }
    };

    if (currentSection === 'MECZE') {
      fetchTeamMatches();
    }
  }, [teamId, currentSection]);
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
        }    
        return nationalityTranslations[nationality] || nationality;
      };

      const renderButtons = () => {
        return (
          <div className="team-buttons">
            <button className="team-button nav-item" onClick={() => handleSectionChange('KADRA')}>KADRA</button>
            <button className="team-button nav-item" onClick={() => handleSectionChange('MECZE')}>MECZE</button>
            <button className="team-button nav-item" onClick={() => handleSectionChange('TABELA')}>TABELA</button>
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
                  <td>
                <button onClick={() => openModal(player)}>
                  {player.name}
                </button>
              </td>
                  <td>{translatePosition(player.position)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
      const renderMatchesTable = () => {
        if (!teamMatches) {
          return <p>No match data available.</p>;
        }
    
        return (
          <table className="team-page-table">
            <tbody>
              {teamMatches.map((match) => (
                <tr key={match.id}>
                  <td>{match.homeTeam.name} vs {match.awayTeam.name}</td>
                  <td>{new Date(match.utcDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
  // Funkcja renderująca zawartość sekcji
  const renderSectionContent = () => {
    switch (currentSection) {
      case 'KADRA':
        return renderPlayersTable();
      case 'MECZE':
        return renderMatchesTable();
      case 'TABELA':
        // Implementacja widoku tabeli
        return <p>Widok tabeli</p>;
      default:
        return <p>Wybierz sekcję</p>;
    }
  };

      return (
        <div className={isDarkMode ? 'dark-mode' : ''}>
          <Navbar />
          <div className="team-page-container">
            <div className="team-upper-container">
              {teamInfo ? (
                <>
                  <div className="team-info-container">
                    <img src={teamInfo.crest} alt={`${teamInfo.name} Crest`} className="team-crestx" />
                    <div className="team-details">
                      <h2><b>{teamInfo.name}</b></h2>
                      <p>Założony: {teamInfo.founded}</p>
                      <p>Strona internetowa: <a href={teamInfo.website} target="_blank" rel="noopener noreferrer">{teamInfo.website}</a></p>
                      <p>Kraj pochodzenia: {translateNationality(teamInfo.area.name)}</p>
                    </div>
                  </div>
                  {renderButtons()}
                </>
              ) : (
                <p>Loading team information...</p>
              )}
            </div>
            <div className="team-container_2">
              {renderSectionContent()}
            </div>
            {selectedPlayer && (
              <PlayerModal player={selectedPlayer} teamInfo={teamInfo} closeModal={closeModal} />
            )}
          </div>
        </div>
      );
    }

    export default TeamPage;