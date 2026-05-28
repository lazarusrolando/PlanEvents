import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClipboard, faGears, faHistory, faHome, faPerson, faTicket } from '@fortawesome/free-solid-svg-icons';
import './AttendanceTracking.css';

const AttendanceTracking = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('registeredEvents')) || [];
    setRegisteredEvents(events);
  }, []);

  const handleCheckIn = async (eventId, email) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        // Update localStorage
        const updatedEvents = registeredEvents.map(event =>
          event.id === eventId ? { ...event, checked_in: true } : event
        );
        setRegisteredEvents(updatedEvents);
        localStorage.setItem('registeredEvents', JSON.stringify(updatedEvents));
        alert('Check-in successful!');
      } else {
        alert('Check-in failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="attendance">
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

      <div className="main-content">
        <header className="headers">
          <div className="headers-left">
            <h1>Attendance Tracking</h1>
          </div>
        </header>

        <div className="attendance-content">
          <p className="animate-on-scroll">Monitor and manage your event attendance.</p>
          <div className="attendees-table">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>
                      <span className={`status ${event.checked_in ? 'checked-in' : 'pending'}`}>
                        {event.checked_in ? 'Checked In' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      {!event.checked_in && (
                        <button
                          className="check-in-button"
                          onClick={() => handleCheckIn(event.id, JSON.parse(localStorage.getItem('user')).email)}
                        >
                          Check In
                        </button>
                      )}
                      {event.checked_in && <span>✓</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracking;
