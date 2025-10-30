import React from 'react';
import { Link } from 'react-router-dom';
import './EventDetailsHeader.css';

const EventDetailsHeader = ({ event }) => {
  const { title, date, category, location, banner, ticket_info } = event || {};

  const bannerSrc = banner ? (banner.startsWith('http') ? banner : `http://localhost:5000/uploads/${banner}`) : '';
  const ticketInfo = ticket_info ? ticket_info : '';

  let metaParts = [];
  if (date) metaParts.push(date);
  if (location) metaParts.push(location);

  return (
    <header className="page-header">
      {bannerSrc && <img src={bannerSrc} alt="Event Banner" className="header-banner" />}

      <div className="header-left">
        <h1>{title || 'Event Title'}</h1>
        <p className="event-category">{category || 'Event Category'}</p>
        <Link to="/events" className="backlink">&larr; Back to Events</Link>
      </div>
      <div className="header-right">
        {bannerSrc && ticketInfo && <p className="ticket-info-overlay">🎫 {ticketInfo}</p>}
        </div>
    </header>
  );
};

export default EventDetailsHeader;
