import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import LoginForm from './LoginForm';
import FootballDataComponent from './FootballDataComponent';
import Modal from 'react-modal';
import axios from 'axios';
import './HomePage.css';
import TestDjango from './TestDjango';
import Sidebar from './SideBar';

Modal.setAppElement('#root');

const Homepage = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [teamInfo, setTeamInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  const fetchTeamInfo = async (teamId) => {
    try {
      const response = await axios.get(`v4/teams/${teamId}`, {
        headers: {
          'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
        },
      });

      setTeamInfo(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching team info:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    <div>
      <Navbar openLoginForm={openLoginForm} onTeamSelect={fetchTeamInfo} />
      <div style={{ display: 'flex' }}> {/* Zaktualizowany layout */}

        <Sidebar />

        <div style={{ flex: 1, flexDirection: 'column' }}> {/* Kontener główny */}
          <div className="homepage-container">
            <div className="homepage-content">
              <FootballDataComponent />
            </div>
          </div>
          {isLoginFormOpen && (
            <div style={{ alignSelf: 'flex-end' }}>
              <LoginForm onClose={closeLoginForm} />
            </div>
          )}

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
                {renderPlayersTable()}
                <br />
                <button onClick={closeModal}>Close</button>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
