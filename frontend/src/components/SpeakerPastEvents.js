import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SpeakerDashboard.css'; // Reuse existing styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHome, faPerson, faHistory, faGears } from '@fortawesome/free-solid-svg-icons';

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
        <nav className="sidebar">
          <ul>
            <li><Link to="/speaker/dashboard"><FontAwesomeIcon icon={faHome}/> Home</Link></li>
            <li><Link to="/speaker/profile"><FontAwesomeIcon icon={faPerson}/> Profile</Link></li>
            <li><Link to="/speaker/talks"><FontAwesomeIcon icon={faCalendar}/> Upcoming Talks</Link></li>
            <li><Link to="/speaker/past-events"><FontAwesomeIcon icon={faHistory}/> Past Events</Link></li>
            <li><Link to="/speaker/settings"><FontAwesomeIcon icon={faGears}/> Settings</Link></li>
          </ul>
        </nav>
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
      <nav className="sidebar">
        <ul>
          <li><Link to="/speaker/dashboard"><FontAwesomeIcon icon={faHome}/> Home</Link></li>
          <li><Link to="/speaker/profile"><FontAwesomeIcon icon={faPerson}/> Profile</Link></li>
          <li><Link to="/speaker/talks"><FontAwesomeIcon icon={faCalendar}/> Upcoming Talks</Link></li>
          <li><Link to="/speaker/past-events"><FontAwesomeIcon icon={faHistory}/> Past Events</Link></li>
          <li><Link to="/speaker/settings"><FontAwesomeIcon icon={faGears}/> Settings</Link></li>
        </ul>
      </nav>

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
