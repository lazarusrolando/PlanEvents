import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <nav className="sidebar">
        <ul>
          <li><Link to="/dashboard"><i className="fa fa-home"></i> Home</Link></li>
          <li><Link to="/profile"><i className="fa fa-user"></i> Profile</Link></li>
          <li><Link to="/events"><i className="fa fa-calendar"></i> Upcoming Events</Link></li>
          <li><Link to="/registrations"><i className="fa fa-ticket"></i> Tickets</Link></li>
          <li><Link to="/ticketing/attendance"><i className="fa fa-check"></i> Attendance</Link></li>
          <li><Link to="/recents"><i className="fa fa-history"></i> Recents</Link></li>
          <li><Link to="/settings"><i className="fa fa-cog"></i> Settings</Link></li>
        </ul>
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
