import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
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

const Navbar = ({ openLoginForm }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState('');

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

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="Logo" />
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Szukaj..." />
            </div>

            <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                {navLinks.map((link) => (
                    <Link to={link.href} key={link.name}>
                        <div
                            className="nav-item"
                            onMouseEnter={() => setHoveredIcon(link.name)}
                            onMouseLeave={() => setHoveredIcon('')}
                        >
                            <img src={getIcon(link.name)} alt={link.name} className="icon" />
                            <span>{link.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <img src={getIcon('menu')} alt="Menu" />
            </div>
        </header>
    );
};

const navLinks = [
    { name: 'home', label: 'Strona Domowa', icon: HomeIcon, href: '/home' },
    { name: 'login', label: 'Zaloguj', icon: LoginIcon, href: '/login' },
    { name: 'settings', label: 'Ustawienia', icon: SettingsIcon, href: '/settings' }
];

export default Navbar;
