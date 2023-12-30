// MatchTable.js

import React from 'react';
import './MatchTable.css'; // Importuj plik ze stylami

const MatchTable = ({ matches }) => {
  return (
    <div className="match-table-container">
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
              <td className="table-cell">{match.homeTeam.name}</td>
              <td className="table-cell">{match.awayTeam.name}</td>
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
  );
};

export default MatchTable;
