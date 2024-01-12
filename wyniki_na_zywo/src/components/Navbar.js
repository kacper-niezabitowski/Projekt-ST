import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavbarStyles.css';
import HomeIcon from '../img/home.png';
import HomeIcon2 from '../img/home_2.png';
import LoginIcon from '../img/login.png';
import LoginIcon2 from '../img/login_2.png';
import SettingsIcon from '../img/settings.png';
import SettingsIcon2 from '../img/settings_2.png';
import MenuIcon from '../img/menu.png';
import MenuIcon2 from '../img/menu_2.png';
import Logo from '../img/logo.png';
import { useTheme } from './ThemeContext';

const Navbar = ({ openLoginForm, onTeamSelect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const response = await axios.get('/v4/teams/', {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
          params: {
            limit: 384,
          },
        });

        setAllTeams(response.data.teams);
      } catch (error) {
        console.error('Error fetching teams', error);
      }
    };

    fetchAllTeams();
  }, []);

  useEffect(() => {
    if (searchOptions.length === 1) {
      handleTeamSelect(searchOptions[0].id);
    }
  }, [searchOptions]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return hoveredIcon === 'home' ? HomeIcon2 : HomeIcon;
      case 'login':
        return hoveredIcon === 'login' ? LoginIcon2 : LoginIcon;
      case 'settings':
        return hoveredIcon === 'settings' ? SettingsIcon2 : SettingsIcon;
      case 'menu':
        return isMobileMenuOpen ? MenuIcon2 : MenuIcon;
      default:
        return '';
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    let filteredOptions = [];
    if (e.target.value.length > 2) {
      filteredOptions = allTeams.filter((team) =>
        team.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
    setSearchOptions(filteredOptions);
  };

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
    onTeamSelect(teamId);
    navigate(`/team/${teamId}`);
  };

  return (
    <header className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Szukaj drużyny..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="search-options">
          {searchOptions.length > 0 && (
            <select
              value={selectedTeam}
              onChange={(e) => {
                if (e.target.value !== '') {
                  handleTeamSelect(e.target.value);
                }
              }}
            >
              <option value="" disabled>
                Wybierz zespół
              </option>
              {searchOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <NavLink to={link.href} key={link.name}>
            <div
              className="nav-item"
              onMouseEnter={() => setHoveredIcon(link.name)}
              onMouseLeave={() => setHoveredIcon('')}
            >
              <img src={getIcon(link.name)} alt={link.name} className="icon" />
              <span>{link.label}</span>
            </div>
          </NavLink>
        ))}
      </div>

      <button onClick={toggleTheme} className="change-theme-button">
        Zmień tryb
      </button>

      <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <img src={getIcon('menu')} alt="Menu" />
      </div>
    </header>
  );
};

const navLinks = [
  { name: 'home', label: 'Strona Domowa', href: '/home' },
  { name: 'login', label: 'Zaloguj', href: '/login' },
  { name: 'settings', label: 'Ustawienia', href: '/settings' },
];

export default Navbar;
