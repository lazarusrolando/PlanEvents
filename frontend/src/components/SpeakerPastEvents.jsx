import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SpeakerDashboard.css'; // Reuse existing styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHome, faUser, faPerson, faGears, faHistory, faCog } from '@fortawesome/free-solid-svg-icons';

const SpeakerPastEvents = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'speaker') {
      navigate('/speaker/login');
      return;
    }

    fetchPastEvents();
  }, [user, navigate]);

  const fetchPastEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/speaker/events', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch past events');
      }

      const data = await response.json();
      // Filter for past events
      const past = data.filter(event => new Date(event.date) <= new Date());
      setPastEvents(past);
      setError('');
    } catch (err) {
      console.error('Error fetching past events:', err);
      setError('Failed to load past events. Please try again.');
      setPastEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="speaker-dashboard">
        <div className="speaker-sidebar">
          <div className="speaker-sidebar__logo">
            <span className="speaker-sidebar__logo-text">PlanEvents</span>
          </div>
          <p className="speaker-sidebar__section-label">MAIN MENU</p>
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
          <div className="speaker-sidebar__footer">
            <Link to="/" className="speaker-sidebar__item speaker-sidebar__back">
              <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Back to Site</span>
            </Link>
          </div>
        </div>
        <div className="main-content">
          <header className="headers">
            <h1>Past Events</h1>
          </header>
          <div className="loading">Loading past events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="speaker-dashboard">
      <div className="speaker-sidebar">
        <div className="speaker-sidebar__logo">
          <span className="speaker-sidebar__logo-text">PlanEvents</span>
        </div>
        <p className="speaker-sidebar__section-label">MAIN MENU</p>
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
        <div className="speaker-sidebar__footer">
          <Link to="/" className="speaker-sidebar__item speaker-sidebar__back">
            <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
            <span className="speaker-sidebar__text">Back to Site</span>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <header className="headers">
          <h1>Past Events</h1>
        </header>

        {error && <div className="error-message">{error}</div>}

        <div className="speaker-events">
          <h2>Your Past Talks</h2>
          {pastEvents.length > 0 ? (
            <table className="events-table">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pastEvents.map(event => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleString()}</td>
                    <td>{event.location || 'TBD'}</td>
                    <td className="status-past">Completed</td>
                    <td>
                      <Link to={`/events/${event.id}`} className="btn small">View Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-events">
              <p>No past events found. Your completed talks will appear here!</p>
              <Link to="/speaker/dashboard" className="btn">Back to Dashboard</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerPastEvents;
