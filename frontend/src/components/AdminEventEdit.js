import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AdminDashboard.css';

const AdminEventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    category: '',
    organizer: '',
    event_type: '',
    speakers: '',
    agenda: '',
    registration_link: '',
    ticket_info: '',
    requirements: '',
    banner: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/events/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      const data = await response.json();
      setEvent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id !== 'new') {
      fetchEvent();
    } else {
      setLoading(false);
    }
  }, [id, fetchEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id === 'new' ? 'POST' : 'PUT';
      const url = id === 'new' ? 'http://localhost:5000/events' : `http://localhost:5000/events/${id}`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error('Failed to save event');
      }
      navigate('/admin/events');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="admin-dashboard-new">Loading event...</div>;
  }

  if (error) {
    return <div className="admin-dashboard-new">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard-new">
      <div className="admin-sidebar">
        <ul className="admin-sidebar__menu">
          <li className="admin-sidebar__group">
            <Link to="/admin/dashboard" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faHome} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Dashboard</span>
            </Link>
          </li>

          <li className="admin-sidebar__group">
            <Link to="/admin/users" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faUser} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Users</span>
            </Link>
          </li>

          <li className="admin-sidebar__group">
            <Link to="/admin/events" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faCalendar} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Events</span>
            </Link>
          </li>

          <li className="admin-sidebar__group">
            <Link to="/admin/tickets" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faTicket} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Tickets</span>
            </Link>
          </li>

          <li className="admin-sidebar__group">
            <Link to="/admin/analytics" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faChartSimple} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Analytics</span>
            </Link>
          </li>

          <li className="admin-sidebar__group">
            <Link to="/admin/settings" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faCog} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>{id === 'new' ? 'Create Event' : 'Edit Event'}</h1>
        </header>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={event.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={event.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={event.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Start Time:</label>
            <input type="time" name="start_time" value={event.start_time} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>End Time:</label>
            <input type="time" name="end_time" value={event.end_time} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input type="text" name="location" value={event.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input type="text" name="category" value={event.category} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Organizer:</label>
            <input type="text" name="organizer" value={event.organizer} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Event Type:</label>
            <input type="text" name="event_type" value={event.event_type} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Speakers:</label>
            <textarea name="speakers" value={event.speakers} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Agenda:</label>
            <textarea name="agenda" value={event.agenda} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Registration Link:</label>
            <input type="url" name="registration_link" value={event.registration_link} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Ticket Info:</label>
            <textarea name="ticket_info" value={event.ticket_info} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Requirements:</label>
            <textarea name="requirements" value={event.requirements} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Banner URL:</label>
            <input type="url" name="banner" value={event.banner} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-btn">{id === 'new' ? 'Create' : 'Update'} Event</button>
        </form>
      </div>
    </div>
  );
};

export default AdminEventEdit;
