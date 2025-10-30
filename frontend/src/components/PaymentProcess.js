import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PaymentProcess.css';

const PaymentProcess = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ticket = JSON.parse(localStorage.getItem('ticketData'));
    const registration = JSON.parse(localStorage.getItem('registrationData'));
    setTicketData(ticket);
    setRegistrationData(registration);
  }, []);

  const handleMethodSelect = (method) => {
    setPaymentMethod(method);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedData = { ...ticketData, ...registrationData };
    try {
      const response = await fetch(`http://localhost:5000/events/${ticketData.eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData)
      });
      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem('ticketData');
        localStorage.removeItem('registrationData');
        // Add to registeredEvents
        const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
        const event = await fetch(`http://localhost:5000/events/${ticketData.eventId}`).then(res => res.json());
        registeredEvents.push({ ...event, checked_in: false });
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
        navigate('/dashboard');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setPaymentMethod('');
    }
  };

  return (
    <div className="payment-process-container">
      <h2>Payment Process</h2>
      <p className="animate-on-scroll">Secure payment options for your tickets and registrations.</p>
      
      {step === 1 && (
        <div className="method-selection">
          <h3>Select Payment Method</h3>
          <button
            type="button"
            className={`method-btn ${paymentMethod === 'card' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('card')}
          >
            Credit/Debit Card
          </button>
          <button
            type="button"
            className={`method-btn ${paymentMethod === 'googlepay' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('googlepay')}
          >
            Google Pay
          </button>
          <button
            type="button"
            className={`method-btn ${paymentMethod === 'bank' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('bank')}
          >
            Bank Transfer
          </button>
        </div>
      )}

      {step === 2 && paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Enter Card Details</h3>
          <label>
            <strong style={{ color: 'red' }}>*</strong>Card Number:
            <input
              type="text"
              value={cardNumber}
              placeholder="1234 5678 9012 3456"
              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim())}
              maxLength="19"
              required
            />
          </label>
          <label>
            <strong style={{ color: 'red' }}>*</strong>Expiry Date (MM/YY):
            <input
              type="text"
              value={expiry}
              placeholder="MM/YY"
              onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2'))}
              maxLength="5"
              required
            />
          </label>
          <label>
            <strong style={{ color: 'red' }}>*</strong>CVV:
            <input
              type="text"
              value={cvv}
              placeholder="123"
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              maxLength="3"
              required
            />
          </label>
          <div className="form-buttons">
            <button type="button" className="back-button" onClick={handleBack}>Back</button>
            <button type="submit" className="submit-button">Process Payment</button>
          </div>
        </form>
      )}

      {step === 2 && (paymentMethod === 'googlepay' || paymentMethod === 'bank') && (
        <div className="alternative-payment">
          <h3>{paymentMethod === 'googlepay' ? 'Google Pay' : 'Bank Transfer'} Selected</h3>
          <p>Redirecting to {paymentMethod} for secure processing.</p>
          <button type="button" className="process-button" onClick={handleSubmit}>
            Proceed to {paymentMethod.toUpperCase()}
          </button>
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
        </div>
      )}

      <Link to="/ticketing/registration" className="back-link">Back to Registration</Link>
    </div>
  );
};

export default PaymentProcess;
