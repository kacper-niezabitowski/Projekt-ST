// Sidebar.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import "./SideBar.css"

const leagues = [
  { name: 'CHAMPIONS LEAGUE', path: '/v4/competitions/CL' },
  { name: 'PRIMEIRA LIGA', path: '/league/PPL' },
  { name: 'PREMIER LEAGUE', path: '/league/SPL' },
  { name: 'EREDIVISIE', path: '/league/DED' },
  { name: 'BUNDESLIGA', path: '/league/ABL' },
  { name: 'LIGUE 1', path: '/league/FL1' },
  { name: 'SERIE A ITALY', path: '/league/SA' },
  { name: 'SERIE A - BRAZIL', path: '/league/BSA' },
  { name: 'UEFA Champions League', path: '/league/CL' },
];

const Sidebar = () => {
  const { isDarkMode } = useTheme();
  const { leagueId } = useParams();
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const [matchInfo, setMatchInfo] = useState(null);
  const [leagueInfo, setLeagueInfo] = useState(null);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await axios.get(`/v4/matches/${leagueId}`, {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });

        setMatchInfo(response.data);

        // Dodaj kod do pobrania informacji o lidze
        const leagueResponse = await axios.get(`/v4/competitions/${leagueId}`, {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });

        setLeagueInfo(leagueResponse.data);
      } catch (error) {
        console.error('Error fetching match or league info:', error);
      }
    };

    if (leagueId) {
      fetchMatchInfo();
    }
  }, [leagueId]);

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <div className="sidebar-container"> 
        <div>
          <div className="sidebar-header">Ligi Piłkarskie</div>
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
