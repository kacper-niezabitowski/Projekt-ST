import React from 'react';
import './MatchTable.css'; // Importuj plik ze stylami
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; 


const MatchTable = ({ matches }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div className="match-table-container">
        <div className="table-wrapper">
          <table className="match-table">
            <thead>
              <tr>
                <th className="table-header">Home Team</th>
                <th className="table-header">Away Team</th>
                <th className="table-header">Date</th>
                <th className="table-header">Time</th>
                <th className="table-header">Status</th>
                <th className="table-header">Score</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id}>
                  <td
                    className="table-cell home-team"
                    onClick={() => handleTeamClick(match.homeTeam.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {match.homeTeam.name}
                  </td>
                  <td
                    className="table-cell away-team"
                    onClick={() => handleTeamClick(match.awayTeam.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {match.awayTeam.name}
                  </td>
                  <td className="table-cell">{new Date(match.utcDate).toLocaleDateString()}</td>
                  <td className="table-cell">{new Date(match.utcDate).toLocaleTimeString()}</td>
                  <td className="table-cell">{match.status}</td>
                  <td className="table-cell">
                    {match.score && match.score.fullTime.home !== null && match.score.fullTime.away !== null
                      ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MatchTable;
