import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the registration data and navigate back to event details
    console.log({ eventId: id, name, email, phone });
    toast.success('Registration successful (demo)');
    navigate(`/events/${id}`);
  };

  return (
    <div className="registration-form-container">
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          <strong style={{ color: 'red' }}>*</strong>Name:
          <input type="text" value={name} placeholder='Enter your name' onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          <strong style={{ color: 'red' }}>*</strong>Phone Number:
          <input type="tel" pattern="[0-9]{10}" placeholder="1234567890" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} maxLength="10" required />
        </label>
        <label>
          <strong style={{ color: 'red' }}>*</strong>Email:
          <input type="email" value={email} placeholder='Enter your email' onChange={e => setEmail(e.target.value)} required />
        </label>
        <button type="submit" className="submit-button">Register</button>
      </form>
      <Link to={`/events/${id}`} className="back-link">Back to Event Details</Link>
    </div>
  );
};

export default RegistrationForm;
