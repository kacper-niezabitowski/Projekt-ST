import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const LeaguePage = () => {
  const [leagueData, setLeagueData] = useState({ standings: { standings: [] }, matches: null, teams: null, scorers: null });
  const { leagueId } = useParams();
  const [selectedGroup, setSelectedGroup] = useState('Group A');

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const renderGroupTable = (group) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Pozycja</th>
            <th>Drużyna</th>
            <th>Mecze</th>
            <th>Zwycięstwa</th>
            <th>Remisy</th>
            <th>Porażki</th>
            <th>Punkty</th>
            {/* Dodaj inne nagłówki tabeli według potrzeb */}
          </tr>
        </thead>
        <tbody>
          {group.table.map((team, index) => (
            <tr key={team.team.id}>
              <td>{team.position}</td>
              <td>{team.team.name}</td>
              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              <td>{team.points}</td>
              {/* Dodaj inne komórki tabeli według potrzeb */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          `/v4/competitions/${leagueId}/standings`,
          /*`/v4/competitions/${leagueId}/matches`,
          `/v4/competitions/${leagueId}/teams`,
          `/v4/competitions/${leagueId}/scorers`*/
        ];
        const results = await Promise.all(
          endpoints.map(endpoint =>
            axios.get(endpoint, { headers: {'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b'} })
          )
        );

        setLeagueData({
          standings: results[0].data,
          matches: results[1].data,
          teams: results[2].data,
          scorers: results[3].data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (leagueId) {
      fetchData();
    }
  }, [leagueId]);

  if (!leagueData.standings.standings.length) {
    return <div>Ładowanie...</div>;
  }

  
  return (
    <div>
      <Navbar />
      {/* Wybór grupy */}
      <select value={selectedGroup} onChange={handleGroupChange}>
        {leagueData.standings.standings.map((group, index) => (
          <option key={index} value={group.group}>{group.group}</option>
        ))}
      </select>

      {/* Wyświetlanie tabeli dla wybranej grupy */}
      <h2>Tabela dla grupy {selectedGroup}</h2>
      {leagueData.standings.standings.filter(group => group.group === selectedGroup).map(renderGroupTable)}

      {/* Tu możesz dodać resztę interfejsu użytkownika, np. wyświetlanie meczów, drużyn, strzelców */}
    </div>
  );
};

export default LeaguePage;
