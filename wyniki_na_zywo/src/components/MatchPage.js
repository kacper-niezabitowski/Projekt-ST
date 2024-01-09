import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './TeamPage.css';
import { useTheme } from './ThemeContext';

const MatchPage = () => {
  const [matchInfo, setMatchInfo] = useState(null);
  const { matchId } = useParams(); // Używamy useParams, aby pobrać matchId z URL.
  const { isDarkMode } = useTheme();

  console.log("Match ID:", matchId);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await axios.get(`/v4/matches/${matchId}`, {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });
        setMatchInfo(response.data);
      } catch (error) {
        console.error('Error fetching match info:', error);
      }
    };

    if (matchId) {
      fetchMatchInfo();
    }
  }, [matchId]);

  const renderPlayersTable = (team, title) => {
    if (!team || !team.lineup) {
      return <p>No player data available for {title}.</p>;
    }

    return (
      <div>
        <h3>{title}</h3>
        <table className="team-page-table">
          <tbody>
            {team.lineup.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div className="team-page-container">
        <Navbar />
        <div className="team-container">
          {matchInfo ? (
            <div>
              <div className="team-info-container">
                {/* Display match details here */}
                <div>
                    <p>Date: {new Date(matchInfo.utcDate).toLocaleDateString()}</p>
                    <p>Status: {matchInfo.status}</p>
                    <p>Venue: {matchInfo.venue}</p>
                    <p>Attendance: {matchInfo.attendance}</p>
                </div>

               
                
              </div>
            </div>
          ) : (
            <p>Loading match information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
