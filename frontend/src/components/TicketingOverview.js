import React from 'react';
import { Link } from 'react-router-dom';
import './TicketingOverview.css';

const TicketingOverview = () => {
  return (
    <div className="ticketing-overview-container">
      <h2>Ticketing & Registration</h2>
      <p className="animate-on-scroll">Manage your event's ticketing, registrations, payments, and attendance all in one place.</p>
      <div className="overview-grid">
        <Link to="/ticketing/online" className="overview-card">
          <h3>Online Ticketing</h3>
          <p>Sell and manage tickets online with ease.</p>
        </Link>
        <Link to="/ticketing/registration" className="overview-card">
          <h3>Registration Forms</h3>
          <p>Streamline attendee registrations.</p>
        </Link>
        <Link to="/ticketing/payment" className="overview-card">
          <h3>Payment Process</h3>
          <p>Secure and flexible payment options.</p>
        </Link>
        <Link to="/ticketing/attendance" className="overview-card">
          <h3>Attendance Tracking</h3>
          <p>Track check-ins and attendance in real-time.</p>
        </Link>
      </div>
      <Link to="/events" className="back-link">Back to Events</Link>
    </div>
  );
};

export default TicketingOverview;
