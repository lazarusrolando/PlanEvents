import React from 'react';
import { Link } from 'react-router-dom';
import './InTheSpotlight.css';

const spotlightItems = [
     { id: 1, title: 'Featured Event: AI Summit 2024', description: 'Join leading experts in artificial intelligence for groundbreaking discussions and networking.', link: '/events/1' },
     { id: 2, title: 'Spotlight News: New Venue Partnerships', description: 'We\'ve partnered with top venues worldwide to bring you unforgettable experiences.', link: '/about' },
     { id: 3, title: 'Highlight: Award-Winning Team', description: 'Our team has been recognized for excellence in event planning and innovation.', link: '/about/awardsrecognition' },
];

const InTheSpotlight = () => {
     return (
          <section className="in-the-spotlight animate-on-scroll fade-in">
               <div className="spotlight-container">
                    <h2 className="spotlight-title animate-on-scroll slide-up">In The Spotlight</h2>
                    <div className="spotlight-grid">
                         {spotlightItems.map((item, index) => (
                              <div key={item.id} className="spotlight-card animate-on-scroll slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                   <h3>{item.title}</h3>
                                   <p className="spotlight-description">{item.description}</p>
                                   <Link to={item.link} className="spotlight-link">Learn More</Link>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default InTheSpotlight;
