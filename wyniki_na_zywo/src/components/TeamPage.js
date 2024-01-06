import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const TeamPage = () => {
  const [teamInfo, setTeamInfo] = useState(null);
  const { teamId } = useParams(); // Używamy useParams, aby pobrać teamId z URL.
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
  
    if(teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

  const renderPlayersTable = () => {
    if (!teamInfo || !teamInfo.squad) {
      return <p>No player data available.</p>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Date of Birth</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {teamInfo.squad.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.dateOfBirth}</td>
              <td>{player.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {teamInfo ? (
        <div>
          <h2>{teamInfo.name}</h2>
          <img src={teamInfo.crest} alt={`${teamInfo.name} Crest`} />
          <p>Founded: {teamInfo.founded}</p>
          <p>Club Colors: {teamInfo.clubColors}</p>
          <p>
            Website: <a href={teamInfo.website} target="_blank" rel="noopener noreferrer">{teamInfo.website}</a>
          </p>
          {renderPlayersTable()}
        </div>
      ) : (
        <p>Loading team information...</p>
      )}
    </div>
  );
};

export default TeamPage;
