import React, { useState } from 'react';
import './LigaPage.css';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="logo" style={{ textAlign: 'center' }}>
          <img src={`https://crests.football-data.org/${leagueLogoPath}`} alt={`${leagueId} logo`} />
        </div>
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
        <div className="category-buttons">
          <button className="buttonStyle" onClick={() => setSelectedCategory('Gole')}>
            Gole
          </button>
          <button className="buttonStyle" onClick={() => setSelectedCategory('Asysty')}>
            Asysty
          </button>
          <button className="buttonStyle" onClick={() => setSelectedCategory('Żółte kartki')}>
            Żółte kartki
          </button>
          <button className="buttonStyle" onClick={() => setSelectedCategory('Czerwone kartki')}>
            Czerwone kartki
          </button>
        </div>
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
    </div>
  );
};

export default LeaguePage;
