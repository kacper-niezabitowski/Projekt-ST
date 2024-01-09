import React from 'react';
import './LigaPage.css'; // Importujemy plik ze stylami
import Navbar from './Navbar';

const styles = {
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

const LeaguePage = () => {
  const leagueData = [
    { pozycja: 1, druzyna: 'Drużyna A', mecze: 10, zwyciestwa: 8, remisy: 1, porazki: 1, punkty: 25 },
    { pozycja: 2, druzyna: 'Drużyna B', mecze: 10, zwyciestwa: 7, remisy: 2, porazki: 1, punkty: 23 },
    // Dodaj więcej danych dla kolejnych drużyn
  ];

  return (
    <div>
    <Navbar />
    
    <div className="table-wrapper"> {/* Dodaj klasę table-wrapper */}
      
      <table className="match-table" style={styles.table}> {/* Dodaj klasę match-table */}
        <thead>
          <tr>
            <th className="table-header" style={styles.th}>Pozycja</th>
            <th className="table-header" style={styles.th}>Drużyna</th>
            <th className="table-header" style={styles.th}>Mecze</th>
            <th className="table-header" style={styles.th}>Zwycięstwa</th>
            <th className="table-header" style={styles.th}>Remisy</th>
            <th className="table-header" style={styles.th}>Porażki</th>
            <th className="table-header" style={styles.th}>Punkty</th>
          </tr>
        </thead>
        <tbody>
          {leagueData.map((team, index) => (
            <tr key={index}>
              <td className="table-cell" style={styles.td}>{team.pozycja}</td>
              <td className="table-cell" style={styles.td}>{team.druzyna}</td>
              <td className="table-cell" style={styles.td}>{team.mecze}</td>
              <td className="table-cell" style={styles.td}>{team.zwyciestwa}</td>
              <td className="table-cell" style={styles.td}>{team.remisy}</td>
              <td className="table-cell" style={styles.td}>{team.porazki}</td>
              <td className="table-cell" style={styles.td}>{team.punkty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default LeaguePage;
