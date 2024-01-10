import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './MatchPage.css';
import { useTheme } from './ThemeContext';

const MatchPage = () => {
  const [matchInfo, setMatchInfo] = useState(null);
  const { matchId } = useParams();
  const { isDarkMode } = useTheme();

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

  return (
    <div className={`team-page-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar />
      <div className="team-container">
        {matchInfo ? (
          <div className="team-info-container">
            <div className="team-details">
            <div className="competition-container">
              <h3>Competition: {matchInfo.competition.name}</h3>
              <img className="team-crest" src={matchInfo.competition.emblem} alt={matchInfo.competition.name} />
            </div>


              <div className="team-row">
                <div className="team-column">
                  <h3>Home Team: {matchInfo.homeTeam.name}</h3>
                  <img className="team-crest" src={matchInfo.homeTeam.crest} alt={matchInfo.homeTeam.name} />
                </div>
                <div className="team-column">
                  <h3>Away Team: {matchInfo.awayTeam.name}</h3>
                  <img className="team-crest" src={matchInfo.awayTeam.crest} alt={matchInfo.awayTeam.name} />
                </div>
              </div>



              <p>Data meczu: {new Date(matchInfo.utcDate).toLocaleDateString()}</p>
              <p>Status: {matchInfo.status}</p>
              <p>Stadion: {matchInfo.venue}</p>
              <p>Sędzia: {matchInfo.referees[0].name}</p>
              <p>Wynik po pierwszej połowie: {matchInfo.score.halfTime.home} - {matchInfo.score.halfTime.away}</p>
              <p>Wynik po meczowy: {matchInfo.score.fullTime.home} - {matchInfo.score.fullTime.away}</p>

              

              <p>Winner: {matchInfo.winner ? matchInfo.winner === 'HOME_TEAM' ? matchInfo.homeTeam.name : matchInfo.awayTeam.name : 'Match Drawn'}</p>
            </div>
          </div>
        ) : (
          <p>Loading match information...</p>
        )}
      </div>
    </div>
  );
};

export default MatchPage;
