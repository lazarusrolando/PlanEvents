import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
