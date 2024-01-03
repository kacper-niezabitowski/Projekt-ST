import React, { useState, useEffect } from 'react';
import './MatchTable.css'; // Importuj plik ze stylami
import axios from 'axios';
import Modal from 'react-modal'; // Importuj Modal

Modal.setAppElement('#root'); // Ustaw app element dla react-modal

const MatchTable = ({ matches }) => {
  const [teamInfo, setTeamInfo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // Stan modalu
  const [selectedTeamId, setSelectedTeamId] = useState(null); // Stan dla zaznaczonego zespołu

  const fetchTeamInfo = async (teamId) => {
    try {
      const response = await axios.get(`v4/teams/${teamId}`, {
        headers: {
          'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
        },
      });

      setTeamInfo(response.data);
      setModalOpen(true); // Otwórz modal po pobraniu danych
    } catch (error) {
      console.error('Error fetching team info:', error);
    }
  };

  useEffect(() => {
    if (teamInfo === null && matches.length > 0 && selectedTeamId !== null) {
      fetchTeamInfo(selectedTeamId);
    }
  }, [matches, teamInfo, selectedTeamId]);

  const closeModal = () => {
    setModalOpen(false); // Zamknij modal
  };

  const handleTeamClick = (teamId) => {
    setSelectedTeamId(teamId); // Ustaw zaznaczony zespół
  };

  const renderPlayersTable = () => {
    if (!teamInfo || !teamInfo.squad) {
      return null;
    }

    return (
      <div>
        <h3>Players</h3>
        <table className="match-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Position</th>
              <th className="table-header">Date of Birth</th>
              <th className="table-header">Nationality</th>
            </tr>
          </thead>
          <tbody>
            {teamInfo.squad.map((player) => (
              <tr key={player.id}>
                <td className="table-cell">{player.name}</td>
                <td className="table-cell">{player.position}</td>
                <td className="table-cell">{player.dateOfBirth}</td>
                <td className="table-cell">{player.nationality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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
              <td
                className="table-cell"
                onClick={() => handleTeamClick(match.homeTeam.id)}
                style={{ cursor: 'pointer' }}
              >
                {match.homeTeam.name}
              </td>
              <td
                className="table-cell"
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {teamInfo && (
          <div>
            <h2>{teamInfo.name}</h2>
            <img src={teamInfo.crest} alt={`${teamInfo.name} Crest`} />
            <p>Founded: {teamInfo.founded}</p>
            <p>Club Colors: {teamInfo.clubColors}</p>
            <p>
              Website: <a href={teamInfo.website} target="_blank" rel="noopener noreferrer">{teamInfo.website}</a>
            </p>
            {/* Display other team information as needed */}
            {teamInfo.runningCompetitions && (
              <div>
                <br />
                <h3>Running Competitions</h3>
                <ul className="emblems-list">
                  {teamInfo.runningCompetitions.map((competition) => (
                    <li key={competition.id}>
                      {competition.name} - {competition.type}
                      <img src={competition.emblem} alt={`${competition.name} Emblem`} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {teamInfo.coach && (
              <div>
                <br />
                <h3>Coach</h3>
                <p>Name: {teamInfo.coach.name}</p>
                <p>Date of Birth: {teamInfo.coach.dateOfBirth}</p>
                <p>Nationality: {teamInfo.coach.nationality}</p>
                <br />
              </div>
            )}
            {renderPlayersTable()}
            <br />
            <br />
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MatchTable;
