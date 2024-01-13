import React, { useState, useEffect } from 'react';
import MatchTable from './MatchTable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { isDarkMode , useTheme } from './ThemeContext';

const buttonStyle = {
  margin: '5px',
  padding: '10px 15px',
  backgroundColor: '#0D1282',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
const CustomDatePickerButton = {
  backgroundColor: 'rgba(255, 255, 255, 0.0)',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  
}; 

const leagues = [
  { name: 'CHAMPIONS LEAGUE', path: 'CL' },
  { name: 'PRIMEIRA LIGA', path: 'PPL' },
  { name: 'PREMIER LEAGUE', path: 'PL' },
  { name: 'EREDIVISIE', path: 'ED' },
  { name: 'BUNDESLIGA', path: 'BL1' },
  { name: 'LIGUE 1', path: 'FL1' },
  { name: 'SERIE A ITALY', path: 'SA' },
  { name: 'SERIE A - BRAZIL', path: 'BSA' },
  { name: 'UEFA Champions League', path: 'CL' },
];

const FootballDataComponent = () => {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (selectedLeague === 'all') {
          // Fetch matches from all leagues
          const requests = leagues.map((league) =>
            axios.get(`v4/competitions/${league.path}/matches`, {
              headers: {
                'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
              },
            })
          );

          const allMatches = await Promise.all(requests);
          response = { data: { matches: allMatches.flat() } };
        } else {
          // Fetch matches for the selected league
          response = await axios.get(`v4/competitions/${selectedLeague}/matches`, {
            headers: {
              'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
            },
          });
        }

        setMatches(response.data.matches);

        const todayMatches = response.data.matches.filter((match) => {
          const today = new Date().toISOString().split('T')[0];
          return match.utcDate.split('T')[0] === today;
        });

        setFilteredMatches(todayMatches);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedLeague]);

  

  const filterMatches = (filterType) => {
    switch (filterType) {
      case 'finished':
        setFilteredMatches(matches.filter((match) => match.status === 'FINISHED'));
        break;
      case 'scheduled':
        setFilteredMatches(matches.filter((match) => match.status === 'SCHEDULED'));
        break;
      case 'today':
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
  

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  return (
    <div style={{ display: 'flex', color: isDarkMode ? 'white' : 'black', marginRight: '200px', marginTop: '20px' }}>
      {/* Left side - Matches */}
      <div style={{ flex: 1 }}>
        <div>
          Wybierz ligę :
          <select
            value={selectedLeague}
            onChange={handleLeagueChange}
            style={{
              marginBottom: '10px',
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.0)' : 'inherit',
            }}
          >
            <option value="all">Wszystkie</option>
            {leagues.map((league) => (
              <option key={league.path} value={league.path}>
                {league.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter buttons */}
        <div style={{ marginBottom: '10px' }}>
          <button style={buttonStyle} onClick={() => filterMatches('today')}>
            Data
          </button>
          <button style={buttonStyle} onClick={() => filterMatches('finished')}>
            Ukończone
          </button>
          <button style={buttonStyle} onClick={() => filterMatches('scheduled')}>
            Zaplanowane
          </button>
          <button style={buttonStyle} onClick={() => filterMatches('timed')}>
            Timed
          </button>
          <button style={buttonStyle} onClick={() => filterMatches('postponed')}>
            Przełożone
          </button>
        </div>

        {/* Match table */}
        <MatchTable matches={filteredMatches} />
      </div>

      {/* Right side - Calendar */}
      <div style={{ flex: 1, marginLeft: '20px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.0)':'white' }}>
        <div style={{ marginBottom: '10px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.0)':'white'}}>
          Wybierz datę:
        </div>
        <div style={{ flex: 1, marginLeft: '20px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.0)':'white'}}>
        <DatePicker
        
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          
        />
        </div>
      </div>
    </div>
  );
};

export default FootballDataComponent;
