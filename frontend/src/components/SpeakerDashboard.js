import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import './SpeakerDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHome, faUser, faHistory, faCog } from '@fortawesome/free-solid-svg-icons';

const SpeakerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [speakerEvents, setSpeakerEvents] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/speaker/login');
      return;
    }

    if (user && user.role === 'speaker') {
      fetchSpeakerEvents();
    }
  }, [user, loading, navigate]);

  const fetchSpeakerEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/speaker/events', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch speaker events');
      }
      const data = await response.json();
      setSpeakerEvents(data);
    } catch (error) {
      console.error('Error fetching speaker events:', error);
      setSpeakerEvents([]);
    }
  };

  const totalEvents = speakerEvents.length;
  const upcomingEvents = speakerEvents.filter(event => new Date(event.date) > new Date());
  const pastEvents = speakerEvents.filter(event => new Date(event.date) <= new Date());
  const upcomingPercentage = totalEvents > 0 ? Math.round((upcomingEvents.length / totalEvents) * 100) : 0;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user || user.role !== 'speaker') {
    return null;
  }

  return (
    <div className="speaker-dashboard">
      <div className="speaker-sidebar">
        <ul className="speaker-sidebar__menu">
          <li className="speaker-sidebar__group">
            <Link to="/speaker/dashboard" className="speaker-sidebar__item active">
              <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Dashboard</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/profile" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faUser} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Profile</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/talks" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faCalendar} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Upcoming Talks</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/past-events" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faHistory} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Past Events</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/settings" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faCog} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="headers">
          <div className="headers-left">
            <h1 style={{ textAlign: 'center' }}>Welcome to Speaker Dashboard</h1>
          </div>
          <div className="headers-right">
            <input
              type="text"
              className="search-input"
              placeholder="Search talks, events, and more"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Talks</h3>
            <p>{totalEvents}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming Talks</h3>
            <p>{upcomingEvents.length}</p>
          </div>
          <div className="stat-card">
            <h3>Past Talks</h3>
            <p>{pastEvents.length}</p>
          </div>
        </div>

        <section className="charts-section">
          <div className="chart-container">
            <h3>Talks Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Upcoming', value: upcomingEvents.length },
                    { name: 'Past', value: pastEvents.length }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell key="upcoming" fill="#007BFF" />
                  <Cell key="past" fill="#e9ecef" />
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="20" fontWeight="bold">
                  {upcomingPercentage}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="speaker-events">
          <h2>Your Talks</h2>
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {speakerEvents.length > 0 ? (
                speakerEvents.map(event => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                    No talks assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpeakerDashboard;
