import React from 'react';
import './OurTeams.css';

const OurTeams = () => {
  const teams = [
    {
      name: 'Engineering',
      description: 'Our engineering team builds and maintains the core platform, ensuring scalability and innovation.',
      members: ['Alice Johnson', 'Bob Smith', 'Charlie Brown']
    },
    {
      name: 'Marketing',
      description: 'The marketing team drives awareness and engagement for Plan Events.',
      members: ['Diana Prince', 'Eve Adams']
    },
    {
      name: 'Event Planning',
      description: 'Experts in event management who provide insights and support.',
      members: ['Frank Miller', 'Grace Lee']
    },
    {
      name: 'Administration',
      description: 'Handles operations and ensures smooth day-to-day activities.',
      members: ['Henry Wilson', 'Ivy Chen']
    }
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
