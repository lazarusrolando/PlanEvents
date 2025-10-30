import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationForms.css';

const RegistrationForms = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [event, setEvent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const ticketData = JSON.parse(localStorage.getItem('ticketData'));
    if (ticketData) {
      fetch(`http://localhost:5000/events/${ticketData.eventId}`)
        .then(response => response.json())
        .then(eventData => setEvent(eventData.title))
        .catch(error => console.error('Error fetching event:', error));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationData = { name, email, phone };
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
    navigate('/ticketing/payment');
  };

  return (
    <div className="registration-forms-container">
      <h2>Registration Forms</h2>
      <p className="animate-on-scroll">Complete your event registration with our simple form.</p>
      <form onSubmit={handleSubmit} className="registration-form" noValidate>
        <label>
          <strong style={{ color: 'red', marginRight: '0.25rem' }}>*</strong>Name:
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Name"
          />
        </label>
        <label>
          <strong style={{ color: 'red', marginRight: '0.25rem' }}>*</strong>Email:
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </label>
        <label>
          <strong style={{ color: 'red', marginRight: '0.25rem' }}>*</strong>Phone Number:
          <input
            type="tel"
            pattern="[0-9]{10}"
            placeholder="1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            maxLength="10"
            required
            aria-label="Phone Number"
          />
        </label>
        <label>
          Event: {event}
        </label>
        <button type="submit" className="submit-button" aria-label="Submit Registration">Proceed to Payment</button>
      </form>
      <Link to="/ticketing/online" className="back-link">Back to Ticketing</Link>
    </div>
  );
};

export default RegistrationForms;
