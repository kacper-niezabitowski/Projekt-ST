import React, { useState, useEffect } from 'react';
import MatchTable from './MatchTable';
import axios from 'axios';


const buttonStyle = {
    margin: '5px',
    padding: '10px 15px',
    backgroundColor: '#0D1282' ,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

const FootballDataComponent = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('v4/competitions/PL/matches', {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });

        setMatches(response.data.matches);

        // Filtrowanie początkowe: dzisiejsze mecze
        const todayMatches = response.data.matches.filter((match) => {
            const today = new Date().toISOString().split('T')[0];
            return match.utcDate.split('T')[0] === today;
          });

        setFilteredMatches(todayMatches); // Na początku wyświetlamy wszystkie mecze
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz po zamontowaniu komponentu.

  // Funkcja do filtrowania meczów na podstawie wybranego kryterium
  const filterMatches = (filterType) => {
    switch (filterType) {
      case 'finished':
        setFilteredMatches(matches.filter((match) => match.status === 'FINISHED'));
        break;
      case 'scheduled':
        setFilteredMatches(matches.filter((match) => match.status === 'SCHEDULED'));
        break;
      case 'today':
        // Przykład: Wyświetl mecze z dzisiaj
        const todayMatches = matches.filter((match) => {
          const today = new Date().toISOString().split('T')[0];
          return match.utcDate.split('T')[0] === today;
        });
        setFilteredMatches(todayMatches);
        break;
      case 'timed':
        setFilteredMatches(matches.filter((match) => match.status === 'TIMED'));
        break;
      case 'postponed':
        setFilteredMatches(matches.filter((match) => match.status === 'POSTPONED'));
        break;
      
      default:
        // Domyślnie wyświetl wszystkie mecze
        setFilteredMatches(matches);
        break;
    }
  };

  return (
    <div>
      

      {/* Przyciski do filtrowania */}
      <div style={{ marginBottom: '10px' }}>
        <button style={buttonStyle} onClick={() => filterMatches('today')}>Dzisiaj</button>
        <button style={buttonStyle} onClick={() => filterMatches('all')}>Wszystkie</button>
        <button style={buttonStyle} onClick={() => filterMatches('finished')}>Ukończone</button>
        <button style={buttonStyle} onClick={() => filterMatches('scheduled')}>Zaplanowane</button>
        <button style={buttonStyle} onClick={() => filterMatches('timed')}>Timed</button>
        <button style={buttonStyle} onClick={() => filterMatches('postponed')}>Przełożone</button>
        
        
      </div>

      <MatchTable matches={filteredMatches} />
    </div>
  );
};

export default FootballDataComponent;
