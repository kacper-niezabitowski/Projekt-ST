import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FootballDataComponent = () => {
  const [standings, setStandings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('v4/teams/86/matches?status=SCHEDULED', {
          headers: {
            'X-Auth-Token': 'ab6042f051914c4e902c15c42d59356b',
          },
        });

        setStandings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Wyniki: </h2>
      {standings ? (
        <pre>{JSON.stringify(standings, null, 2)}</pre>
      ) : (
        <p>Loading standings...</p>
      )}
    </div>
  );
};

export default FootballDataComponent;
