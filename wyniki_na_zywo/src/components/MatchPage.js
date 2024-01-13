import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './MatchPage.css';
import { useTheme } from './ThemeContext';
import Footer from './Footer';

const MatchPage = () => {
  const [matchInfo, setMatchInfo] = useState(null);
  const { matchId } = useParams();
  const { isDarkMode } = useTheme();
  const [teamLineups, setTeamLineups] = useState(null);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await axios.get(`/v4/matches/${matchId}`, {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });
        setMatchInfo(response.data);
        console.log("Match Info:", matchInfo);
      } catch (error) {
        console.error('Error fetching match info:', error);
      }
    };

    if (matchId) {
      fetchMatchInfo();
    }
  }, [matchId]);
  const loadTeamLineups = async () => {
    try {
      const response = await axios.get(`/v4/matches/${matchId}`, {
        headers: {
          'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
        },
      });
      console.log("API Response Data:", response.data);
      const lineups = {
        homeTeam: response.data.match.homeTeam,
        awayTeam: response.data.match.awayTeam,
      };
      setTeamLineups(lineups);
    } catch (error) {
      console.error('Error fetching team lineups:', error);
    }
  };
  
  return (
    <div className={`team-page-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar className="custom"/>
      <div className="team_container">
        {matchInfo ? (
          <div className="team-info-container">
            <div className="team-details">
            <div className="competition-container">
              <h3><b>{matchInfo.competition.name}, {new Date(matchInfo.utcDate).toLocaleDateString()}</b></h3>
            </div>
            <div className="team-row">
                <div className="team-column">
                  <img className="team-crest" src={matchInfo.homeTeam.crest} alt={matchInfo.homeTeam.name} />
                  <h3>{matchInfo.homeTeam.name}</h3>
                </div>
                <div className="team-score">
                  <h3>{matchInfo.score.fullTime.home} - {matchInfo.score.fullTime.away}</h3>
                </div>
                <div className="team-column">
                  <img className="team-crest" src={matchInfo.awayTeam.crest} alt={matchInfo.awayTeam.name} />
                  <h3>{matchInfo.awayTeam.name}</h3>
                </div>
              </div>
              <div className="match-buttons-container">
              <button className="match-button" onClick={loadTeamLineups}>SKŁADY</button>
              <button className="match-button">STATYSTYKI</button>
            </div>
            {teamLineups && (
                <div className="lineups-container">
                  <div>
                    <h3>Home Team: {teamLineups.homeTeam.name}</h3>
                    {/* Lista zawodników drużyny gospodarzy */}
                    {teamLineups.homeTeam.lineup.map(player => (
                      <p key={player.id}>{player.name} - {player.position}</p>
                    ))}
                  </div>
                  <div>
                    <h3>Away Team: {teamLineups.awayTeam.name}</h3>
                    {/* Lista zawodników drużyny gości */}
                    {teamLineups.awayTeam.lineup.map(player => (
                      <p key={player.id}>{player.name} - {player.position}</p>
                    ))}
                  </div>
                </div>
              )}
              <div className="status-container">
                <h3><b>Informacje o spotkaniu</b></h3>
              </div>
              <p>Status: {matchInfo.status}</p>
              <p>Stadion: {matchInfo.venue}</p>
              <p>Sędzia: {matchInfo.referees[0].name}</p>
            </div>
          </div>
        ) : (
          <p>Wczytywanie informacji o meczu...</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MatchPage;
