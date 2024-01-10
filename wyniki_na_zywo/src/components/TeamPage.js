import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './TeamPage.css';
import { useTheme } from './ThemeContext';

const TeamPage = () => {
  const [teamInfo, setTeamInfo] = useState(null);
  const { teamId } = useParams(); // Używamy useParams, aby pobrać teamId z URL.
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
        console.log("Team Info:", teamInfo);
      } catch (error) {
        console.error('Error fetching team info:', error);
      }
    };
  
    if(teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

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
            <td>{player.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div className="team-page-container">
        <Navbar />
        <div className="team-container">
          {teamInfo ? (
            <div>
              <div className="team-info-container">
                <img src={teamInfo.crest} alt={`${teamInfo.name} Crest`} className="team-crest" />
                <div className="team-details">
                  <h2>{teamInfo.name}</h2>
                  <p>Founded: {teamInfo.founded}</p>
                  <p>
                    Website: <a href={teamInfo.website} target="_blank" rel="noopener noreferrer">{teamInfo.website}</a>
                  </p>
                </div>
              </div>
              {renderPlayersTable()}
            </div>
          ) : (
            <p>Loading team information...</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TeamPage;
