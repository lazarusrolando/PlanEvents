import React from 'react';
import './VenueLogistics.css';

const VenueLogistics = () => {
  return (
    <section className="venue-logistics-container">
      <div className="venue-logistics-content">
        <h1>Venue & Logistics Management</h1>
        <p>Streamline your event logistics with Plan Events' comprehensive venue and logistics tools. From booking venues to coordinating vendors, we make it easy to manage every aspect of your event's backend.</p>
        <div className="features-list">
          <h2>Key Features</h2>
          <ul>
            <li>Venue Booking: Discover and reserve perfect venues with integrated calendars and availability checks.</li>
            <li>Merchandise Store: Set up and manage online stores for event merchandise seamlessly.</li>
            <li>Logistics Management: Track shipments, inventory, and timelines in real-time.</li>
            <li>Vendor Coordination: Communicate and collaborate with vendors through a centralized platform.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VenueLogistics;
