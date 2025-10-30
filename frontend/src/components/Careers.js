import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Careers.css';

const Careers = () => {
  const location = useLocation();

  const sidebarItems = [
    { name: 'Overview', path: '/careers/overview' },
    { name: 'Culture', path: '/careers/culture' },
    { name: 'Benefits', path: '/careers/benefits' },
    { name: 'Inclusion', path: '/careers/inclusion' },
    { name: 'Event Planning', path: '/careers/event-planning' },
    { name: 'Marketing', path: '/careers/marketing' },
    { name: 'Engineering', path: '/careers/engineering' },
    { name: 'Administration', path: '/careers/administration' },
    { name: 'Interviewing With Us', path: '/careers/interviewing' },
    { name: 'Internships & Early Careers', path: '/careers/internships' },
    { name: 'Open Positions', path: '/careers/open-positions' },
  ];

  return (
    <section className="careers-section">
      <div className="careers-layout">
        <nav className="careers-sidebar">
          <ul className="careers-sidebar-list">
            {sidebarItems.map(item => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={`careers-sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="careers-main">
          <div className="careers-hero">
            <h1 className="careers-title">Careers at Plan Events</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Careers;
