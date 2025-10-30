import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OnlineTicketing.css';

const OnlineTicketing = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [ticketType, setTicketType] = useState('general');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(50); // General ticket price: $50
  const navigate = useNavigate();

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
    const ticketData = { eventId: selectedEvent, ticketType, quantity };
    localStorage.setItem('ticketData', JSON.stringify(ticketData));
    navigate('/ticketing/registration');
  };

  return (
    <div className="online-ticketing-container">
      <h2>Online Ticketing</h2>
      <p className="animate-on-scroll">Purchase tickets for your events securely and easily online.</p>
      <form onSubmit={handleSubmit} className="ticketing-form">
        <label>
          <strong style={{ color: 'red' }}>*</strong>Select Event:
          <select value={selectedEvent} onChange={handleEventChange} required>
            <option value="">Choose an event</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.title} - {event.date}</option>
            ))}
          </select>
        </label>
        <label>
          <strong style={{ color: 'red' }}>*</strong>Ticket Type:
          <select value={ticketType} onChange={handleTicketTypeChange} required>
            <option value="general">General Admission ($50)</option>
            <option value="vip">VIP ($100)</option>
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
          Total: ${total}
        </div>
        <button type="submit" className="purchase-button">Proceed to Registration</button>
      </form>
      <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
    </div>
  );
};

export default OnlineTicketing;
