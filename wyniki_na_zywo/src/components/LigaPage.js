import React, { useState, useEffect  } from 'react';
import './LigaPage.css';
import Navbar from './Navbar';
import { useParams, useHistory, useNavigate  } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginBottom: '20px',
    marginTop: '20px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
};
const buttonStyle = {
  margin: '5px',
  padding: '10px 15px',
  backgroundColor: '#0D1282',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '20px',
  marginTop: '20px',
};



const loga = [
  { name: 'CHAMPIONS LEAGUE', path: 'CL.png' },
  { name: 'PRIMEIRA LIGA', path: 'PL.png' },
  { name: 'PREMIER LEAGUE', path: 'PPL.png' },
  { name: 'EREDIVISIE', path: 'ED.png' },
  { name: 'BUNDESLIGA', path: 'BL1.png' },
  { name: 'LIGUE 1', path: 'FL1.png' },
  { name: 'SERIE A ITALY', path: 'SA.png' },
  { name: 'SERIE A - BRAZIL', path: 'BSA.png' },
  { name: 'UEFA Champions League', path: 'CL.png' },
];

const LeaguePage = () => {
  const leagueData = [
    { pozycja: 1, druzyna: 'Bayer Leverkusen', mecze: 16, zwyciestwa: 13, remisy: 3, porazki: 0, punkty: 42 },
    { pozycja: 2, druzyna: 'Bayern Monachium', mecze: 15, zwyciestwa: 12, remisy: 2, porazki: 1, punkty: 38 },
    { pozycja: 3, druzyna: 'Stuttgart', mecze: 16, zwyciestwa: 11, remisy: 1, porazki: 4, punkty: 34 },
    { pozycja: 4, druzyna: 'RB Lipsk', mecze: 16, zwyciestwa: 10, remisy: 3, porazki: 3, punkty: 33 },
    { pozycja: 5, druzyna: 'Borussia Dortmund', mecze: 16, zwyciestwa: 7, remisy: 6, porazki: 3, punkty: 27 },
    { pozycja: 6, druzyna: 'Eintracht Frankfurt', mecze: 16, zwyciestwa: 6, remisy: 6, porazki: 4, punkty: 24 },
    { pozycja: 7, druzyna: 'Hoffenheim', mecze: 16, zwyciestwa: 7, remisy: 3, porazki: 6, punkty: 24 },
    { pozycja: 8, druzyna: 'FreiBurg', mecze: 16, zwyciestwa: 7, remisy: 3, porazki: 6, punkty: 24 },
    { pozycja: 9, druzyna: 'Heidenheim', mecze: 16, zwyciestwa: 6, remisy: 2, porazki: 8, punkty: 20 },
    { pozycja: 10, druzyna: 'WolfsBurg', mecze: 16, zwyciestwa: 6, remisy: 1, porazki: 9, punkty: 19 },
    { pozycja: 11, druzyna: 'Augsburg', mecze: 16, zwyciestwa: 4, remisy: 6, porazki: 6, punkty: 18 },
    { pozycja: 12, druzyna: 'Borussia Mönchengladbach', mecze: 16, zwyciestwa: 5, remisy: 7, porazki: 1, punkty: 17 },
    { pozycja: 13, druzyna: 'Werder Brema', mecze: 16, zwyciestwa: 4, remisy: 4, porazki: 8, punkty: 16 },
    { pozycja: 14, druzyna: 'Bochum', mecze: 16, zwyciestwa: 3, remisy: 7, porazki: 6, punkty: 16 },
    { pozycja: 15, druzyna: 'Union Berlin', mecze: 16, zwyciestwa: 4, remisy: 1, porazki: 10, punkty: 13 },
    { pozycja: 16, druzyna: 'FSV Mainz', mecze: 16, zwyciestwa: 1, remisy: 7, porazki: 8, punkty: 10 },
    { pozycja: 17, druzyna: 'FC Köln', mecze: 16, zwyciestwa: 2, remisy: 4, porazki: 10, punkty: 10 },
    { pozycja: 18, druzyna: 'Darmstadt', mecze: 16, zwyciestwa: 2, remisy: 4, porazki: 10, punkty: 10 },
    // Dodaj więcej danych dla kolejnych drużyn
  ];

  const strzelcyData = [
    {Zawodnik: 'Harry Kane', Gole: 21},
    {Zawodnik: 'Serhou Guirassy', Gole: 17},
    {Zawodnik: 'Lois Openda', Gole: 11},
    {Zawodnik: 'Victor Boniface', Gole: 10},
    {Zawodnik: 'Deniz Undav', Gole: 9},
    {Zawodnik: 'Jonas Wind', Gole: 9},
  ]

  const AsystyData = [
    {Zawodnik: 'Leroy Sane', Asysty: 8},
    {Zawodnik: 'Florian Wirtz', Asysty: 7},
    {Zawodnik: 'Jan-Niklas Beste', Asysty: 7},
    {Zawodnik: 'Julian Brandt', Asysty: 7},
    {Zawodnik: 'Vistor Boniface', Asysty: 7},
    {Zawodnik: 'Xavi Simons', Asysty: 7},
  ]

  const { leagueId } = useParams();
  const leagueLogoPath = loga.find((logo) => logo.path.includes(leagueId))?.path || 'default.png';
  const [selectedCategory, setSelectedCategory] = useState('Gole');
  const [selectedView, setSelectedView] = useState('table');
  const [matchesData, setMatchesData] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const navigate = useNavigate();

  const getSelectedCategoryData = () => {
    switch (selectedCategory) {
      case 'Gole':
        return strzelcyData.map((player, index) => (
          <tr key={index}>
            <td className="table-cell">{player.Zawodnik}</td>
            <td className="table-cell">{player.Gole}</td>
          </tr>
        ));
      case 'Asysty':
        return AsystyData.map((player, index) => (
          <tr key={index}>
            <td className="table-cell">{player.Zawodnik}</td>
            <td className="table-cell">{player.Asysty}</td>
          </tr>
        ));
      // Dodaj przypadki dla innych kategorii, jeśli są potrzebne
      default:
        return null;
    }
  };

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  const handleDetailsClick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

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

  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        // Fetch matches data using your API endpoint
        const response = await axios.get(`/v4/competitions/${leagueId}/matches`, {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });
        setMatchesData(response.data.matches);
        setFilteredMatches(response.data.matches); // Initially display all matches
      } catch (error) {
        console.error('Error fetching matches data:', error);
      }
    };

    if (leagueId) {
      fetchMatchesData();
    }
  }, [leagueId]);

  const filterMatches = (filterType) => {
    switch (filterType) {
      case 'finished':
        setFilteredMatches(matchesData.filter((match) => match.status === 'FINISHED'));
        break;
      case 'scheduled':
        setFilteredMatches(matchesData.filter((match) => match.status === 'SCHEDULED'));
        break;
      case 'today':
        // Przykład: Wyświetl mecze z dzisiaj
        const todayMatches = matchesData.filter((match) => {
          const today = new Date().toISOString().split('T')[0];
          return match.utcDate.split('T')[0] === today;
        });
        setFilteredMatches(todayMatches);
        break;
      case 'timed':
        setFilteredMatches(matchesData.filter((match) => match.status === 'TIMED'));
        break;
      case 'postponed':
        setFilteredMatches(matchesData.filter((match) => match.status === 'POSTPONED'));
        break;
      
      default:
          // Domyślnie wyświetl wszystkie mecze
        setFilteredMatches(matchesData);
         break;
    }
  };

  const renderView = () => {
    switch (selectedView) {
      case 'table':
        return (
          <div className="table-wrapper">
            <table className="match-table">
              <thead>
                <tr>
                  <th className="table-header">Pozycja</th>
                  <th className="table-header">Drużyna</th>
                  <th className="table-header">Mecze</th>
                  <th className="table-header">Zwycięstwa</th>
                  <th className="table-header">Remisy</th>
                  <th className="table-header">Porażki</th>
                  <th className="table-header">Punkty</th>
                </tr>
              </thead>
              <tbody>
                {leagueData.map((team, index) => (
                  <tr key={index}>
                    <td className="table-cell">{team.pozycja}</td>
                    <td className="table-cell">{team.druzyna}</td>
                    <td className="table-cell">{team.mecze}</td>
                    <td className="table-cell">{team.zwyciestwa}</td>
                    <td className="table-cell">{team.remisy}</td>
                    <td className="table-cell">{team.porazki}</td>
                    <td className="table-cell">{team.punkty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        case 'stats':
      return (
        <div>
          {/* Przyciski do wyboru kategorii statystyk */}
          <div className="category-buttons">
            <button className="buttonStyle" onClick={() => setSelectedCategory('Gole')}>
              Gole
            </button>
            <button className="buttonStyle" onClick={() => setSelectedCategory('Asysty')}>
              Asysty
            </button>
            <button className="buttonStyle" onClick={() => setSelectedCategory('Asysty')}>
              Żółte kartki
            </button>
            <button className="buttonStyle" onClick={() => setSelectedCategory('Asysty')}>
              Czerwone kartki
            </button>
            {/* Dodaj przyciski dla innych kategorii, jeśli są potrzebne */}
          </div>
          {/* Tabela statystyk */}
          <div className="table-wrapper">
            <table className="match-table">
              <thead>
                <tr>
                  <th className="table-header">Zawodnik</th>
                  <th className="table-header">{selectedCategory}</th>
                </tr>
              </thead>
              <tbody>{getSelectedCategoryData()}</tbody>
            </table>
          </div>
        </div>
      );
      case 'matches':
        return (
          <div>
          <div className="filter-buttons"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
          <div style={{ marginBottom: '10px' }}>
            <button style={buttonStyle} onClick={() => filterMatches('today')}>Dzisiaj</button>
            <button style={buttonStyle} onClick={() => filterMatches('all')}>Wszystkie</button>
            <button style={buttonStyle} onClick={() => filterMatches('finished')}>Ukończone</button>
            <button style={buttonStyle} onClick={() => filterMatches('scheduled')}>Zaplanowane</button>
            <button style={buttonStyle} onClick={() => filterMatches('postponed')}>Przełożone</button>
                {/* Add more buttons as needed */}
                
              </div>
              </div>
          <div className="table-wrapper">
            
            <table className="match-table">
              
              <thead>
                 <tr>
                  <th className="table-header">Data</th>
                  <th className="table-header">Gospodarz</th>
                  <th className="table-header">Gość</th>
                  <th className="table-header">Wynik</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Szczegóły</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatches.map((match, index) => (
                  <tr key={index}>
                    <td className="table-cell">{new Date(match.utcDate).toLocaleDateString()}</td>
                    <td className="table-cell">{match.homeTeam.name}</td>
                    <td className="table-cell">{match.awayTeam.name}</td>
                    <td className="table-cell">
                    {match.score && match.score.fullTime.home !== null && match.score.fullTime.away !== null
                      ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                      : '-'}
                  </td>
                    <td className="table-cell">{translateStatus(match.status)}</td>
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
        );
      default:
        return null;
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="league-info-container"> {/* Dodany kontener */}
        <div className="logo-container">
          <div className="logo" style={{ textAlign: 'center' }}>
            <img src={`https://crests.football-data.org/${leagueLogoPath}`} alt={`${leagueId} logo`} />
          </div>
          <div className="league-details">
    <div className="league-name">Bundesliga</div>
    <div className="league-country">Niemcy</div>
    <div className="league-season">2023/2024</div>
  </div>
          </div>
          <div className="category-buttons">
            <button className="buttonStyle" onClick={() => setSelectedView('table')}>
              Tabela
            </button>
            <button className="buttonStyle" onClick={() => setSelectedView('stats')}>
              Statystyki
            </button>
            <button className="buttonStyle" onClick={() => setSelectedView('matches')}>
              Mecze
            </button>
          </div>
        </div>
        
        {renderView()}
      </div>
    </div>
  );
}

export default LeaguePage;
