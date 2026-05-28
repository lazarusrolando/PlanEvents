import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClipboard, faGears, faHistory, faHome, faPerson, faTicket } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableEvents, setAvailableEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      const storedRegisteredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
      setRegisteredEvents(storedRegisteredEvents);

      fetch('http://localhost:5000/events')
        .then(response => response.json())
        .then(data => {
          const registeredIds = storedRegisteredEvents.map(e => e.id);
          const available = data.filter(event => !registeredIds.includes(event.id));
          setAvailableEvents(available);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          setAvailableEvents([]);
        });
    }
  }, [user, loading, navigate]);

  const totalEvents = availableEvents.length + registeredEvents.length;
  const totalPercentage = totalEvents > 0 ? Math.round((registeredEvents.length / totalEvents) * 100) : 0;
  const attendedCount = registeredEvents.filter(e => e.checked_in).length;
  const attendedPercentage = registeredEvents.length > 0 ? Math.round((attendedCount / registeredEvents.length) * 100) : 0;
  const filteredAvailableEvents = availableEvents.filter((event) =>
    (event.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <nav className="speaker-sidebar">
        <div className="speaker-sidebar__logo">
          <span className="speaker-sidebar__logo-text">PlanEvents</span>
        </div>
        <p className="speaker-sidebar__section-label">MAIN MENU</p>
        <ul className="speaker-sidebar__menu">
          <li className="speaker-sidebar__group">
            <Link to="/dashboard" className="speaker-sidebar__item active">
              <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Home</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/profile" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faPerson} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Profile</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/events" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faCalendar} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Upcoming Events</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/registrations" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faTicket} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Tickets</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/ticketing/attendance" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faClipboard} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Attendance</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/recents" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faHistory} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Recents</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/settings" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faGears} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Settings</span>
            </Link>
          </li>
        </ul>
        <div className="speaker-sidebar__footer">
          <Link to="/" className="speaker-sidebar__item speaker-sidebar__back">
            <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
            <span className="speaker-sidebar__text">Back to Site</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="headers">
          <div className="headers-left">
            <h1>Welcome to User Dashboard</h1>
          </div>
          <div className="headers-right">
            <input
              type="text"
              className="search-input"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        <div className="available-events-card">
          <h3>Available Events</h3>
          <p>{filteredAvailableEvents.length} events available to register for</p>
          <Link to="/events" className="view-available">View Available Events</Link>
        </div>

        <section className="charts-section">
          <div className="chart-container">
            <h3>Total Events</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Registered', value: registeredEvents.length },
                    { name: 'Available', value: availableEvents.length }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell key="registered" fill="#007BFF" />
                  <Cell key="available" fill="#e9ecef" />
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="20" fontWeight="bold">
                  {totalPercentage}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h3>Events Attended</h3>
            {registeredEvents.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Attended', value: attendedCount },
                    { name: 'Not Attended', value: registeredEvents.length - attendedCount }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell key="attended" fill="#28a745" />
                  <Cell key="not-attended" fill="#dc3545" />
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="20" fontWeight="bold">
                  {attendedPercentage}%
                </text>
              </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No events registered yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
