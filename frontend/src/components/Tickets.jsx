import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClipboard, faGears, faHistory, faHome, faPerson, faTicket } from '@fortawesome/free-solid-svg-icons';
import './Tickets.css';

const Tickets = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [ticketType, setTicketType] = useState('general');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(50); // General ticket price: ₹50

  const prices = { general: 50, vip: 100 };


  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    setTotal(prices[ticketType] * newQuantity);
  };

  const handleTicketTypeChange = (e) => {
    const newType = e.target.value;
    setTicketType(newType);
    setTotal(prices[newType] * quantity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      alert('Please select an event.');
      return;
    }
    console.log({ selectedEvent, ticketType, quantity, total });
    alert(`Purchase successful (demo)! Total: ₹${total} for ${quantity} ${ticketType} tickets for ${selectedEvent}.`);
  };

  return (
    <div className="tickets">
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
          <h1>My Tickets</h1>
        </header>

        <div className="tickets-content">
          <p>Purchase tickets for upcoming events.</p>
          <form onSubmit={handleSubmit} className="tickets-form">
            <label>
              <strong style={{ color: 'red' }}>*</strong>Select Event:
              <select value={selectedEvent} onChange={handleEventChange} required>
                <option value="">Choose an event</option>
                {events.map(event => (
                  <option key={event.id} value={event.title}>{event.title} - {event.date}</option>
                ))}
              </select>
            </label>
            <label>
              <strong style={{ color: 'red' }}>*</strong>Ticket Type:
              <select value={ticketType} onChange={handleTicketTypeChange} required>
                <option value="general">General Admission (₹50)</option>
                <option value="vip">VIP (₹100)</option>
              </select>
            </label>
            <label>
              <strong style={{ color: 'red' }}>*</strong>Quantity:
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </label>
            <div className="total-price">
              Total: ₹{total}
            </div>
            <button type="submit" className="purchase-button">Purchase Tickets</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
