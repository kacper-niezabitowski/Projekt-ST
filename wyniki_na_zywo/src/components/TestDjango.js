import React, { useState, useEffect } from 'react';

const TestDjango = () => {
    const [profiles, setProfiles] = useState([]); // Stan do przechowywania profilów

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/profiles/')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Sprawdź, czy dane są odbierane
                setProfiles(data);
            });
    }, []);
    
    
    return (
        <div>
            {profiles.map(profile => (
             <div key={profile.ID_uzytkownika}>
             <p>ID użytkownika: {profile.ID_uzytkownika}</p>
        </div>
))}

        </div>
    );
};

export default TestDjango;
