import React from 'react';
import './OurTeams.css';

const OurTeams = () => {
  const teams = [
    {
      name: 'Owner',
      description: 'The owner leads the company and makes strategic decisions.',
      members: ['Lazarus Rolando']
    },
  ];

  return (
    <section className="our-teams-container">
      <div className="our-teams-content">
        <h1>Our Teams</h1>
        <p>Meet the dedicated teams behind Plan Events. Each team plays a crucial role in delivering exceptional event management solutions.</p>
        <div className="teams-grid">
          {teams.map((team, index) => (
            <div key={index} className="team-card">
              <h2>{team.name}</h2>
              <p>{team.description}</p>
              <h3>Team Members:</h3>
              <ul>
                {team.members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeams;
