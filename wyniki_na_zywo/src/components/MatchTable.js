import React from 'react';
import './MatchTable.css'; // Importuj plik ze stylami
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const translateStatus = (status) => {
  switch (status) {
    case 'SCHEDULED':
      return 'Zaplanowany';
    case 'IN_PLAY':
      return 'W trakcie';
    case 'PAUSED':
      return 'Zatrzymany';
    case 'FINISHED':
      return 'Zakończony';
    case 'POSTPONED':
      return 'Przełożony';
    case 'TIMED':
      return 'timed';
    
    default:
      return status;
  }
};

const MatchTable = ({ matches }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  const handleDetailsClick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div className="match-table-container">
        <div className="table-wrapper">
          <table className="match-table">
            <thead>
              <tr>
                <th className="table-header">Drużyna gospodarzy</th>
                <th className="table-header">Drużyna wyjazdowa</th>
                <th className="table-header">Data</th>
                <th className="table-header">Godzina</th>
                <th className="table-header">Status</th>
                <th className="table-header">Wynik</th>
                <th className="table-header">Szczegóły</th>
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
                  <td className="table-cell">{translateStatus(match.status)}</td>
                  <td className="table-cell">
                    {match.score && match.score.fullTime.home !== null && match.score.fullTime.away !== null
                      ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                      : '-'}
                  </td>
                  <td
                    className="table-cell details"
                    onClick={() => handleDetailsClick(match.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    Szczegóły
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
