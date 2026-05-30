import React from 'react';
import { Link } from 'react-router-dom';
import './TicketingOverview.css';
import { FaCreditCard, FaFileAlt, FaQrcode, FaTicketAlt } from 'react-icons/fa';

const TicketingOverview = () => {
  const ticketingProducts = [
    {
      title: 'Online Ticketing',
      path: '/ticketing/online',
      description: 'Sell tickets, collect attendee choices, and move buyers into registration without manual handoffs.',
      icon: FaTicketAlt
    },
    {
      title: 'Registration Forms',
      path: '/ticketing/registration',
      description: 'Capture attendee details with focused forms that connect directly to the payment workflow.',
      icon: FaFileAlt
    },
    {
      title: 'Payment Process',
      path: '/ticketing/payment',
      description: 'Guide attendees through secure payment options and complete their event registration.',
      icon: FaCreditCard
    },
    {
      title: 'Attendance Tracking',
      path: '/ticketing/attendance',
      description: 'Monitor registration status and check-ins so your team knows who has arrived.',
      icon: FaQrcode
    }
  ];

  return (
    <div className="ticketing-overview-container">
      <span className="ticketing-eyebrow">Ticketing & Registration</span>
      <h2>Convert interest into confirmed attendees</h2>
      <p className="animate-on-scroll">Manage ticket selection, attendee registration, payments, and check-ins with a connected flow built for event teams.</p>
      <div className="overview-grid">
        {ticketingProducts.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path} className="overview-card">
              <span className="overview-icon"><Icon /></span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>Open workflow</strong>
            </Link>
          );
        })}
      </div>
      <Link to="/products" className="back-link">Back to Products</Link>
    </div>
  );
};

export default TicketingOverview;
