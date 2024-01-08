import React from 'react';
import { Link } from 'react-router-dom';
import "./SideBar.css"
import { useTheme } from './ThemeContext';

const leagues = [
  { name: 'CHAMPIONS LEAGUE', path: '/league/CL' },
  { name: 'PRIMEIRA LIGA', path: '/league/PPL' },
  { name: 'PREMIER LEAGUE', path: '/league/SPL' },
  { name: 'EREDIVISIE', path: '/league/DED' },
  { name: 'BUNDESLIGA', path: '/league/ABL' },
  { name: 'LIGUE 1', path: '/league/FL1' },
  { name: 'SERIE A ITALY', path: '/league/SA' },
  { name: 'SERIE A - BRAZIL', path: '/league/BSA' },
  
];

const Sidebar = () => {
    const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
        <div className="sidebar-container"> 
            <div>
            <div className="sidebar-header">Ligi Piłkarskie</div> {/* Dodany nagłówek */}
            <ul>
                {leagues.map(league => (
                <li key={league.name}>
                    <Link to={league.path}>{league.name}</Link>
                </li>
                ))}
            </ul>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;
