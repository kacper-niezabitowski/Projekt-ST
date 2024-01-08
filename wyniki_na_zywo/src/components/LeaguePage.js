import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LeaguePage = () => {
  const [leagueData, setLeagueData] = useState(null);
  const { leagueId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Pobranie danych o lidze
    fetch(`/v4/competitions/${leagueId}`)
      .then(response => response.json())
      .then(data => setLeagueData(data))
      .catch(error => console.error('Error:', error));
  }, [leagueId]);

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  if (!leagueData) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      {/* Wyświetlanie szczegółów ligi */}
      <h1>{leagueData.name}</h1>
      {/* Załóżmy, że leagueData zawiera listę drużyn */}
      <ul>
        {leagueData.teams.map(team => (
          <li key={team.id} onClick={() => handleTeamClick(team.id)} style={{ cursor: 'pointer' }}>
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaguePage;
