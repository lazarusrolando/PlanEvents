import React from 'react';
import './VenueBooking.css';

const VenueBooking = () => {
  return (
    <section className="venue-booking-container">
      <div className="venue-booking-content">
        <h1>Venue Booking</h1>
        <p>Effortlessly find and book the perfect venue for your event with our integrated booking system. Browse thousands of venues, check availability, and secure your space in minutes.</p>
        <div className="booking-features">
          <h2>Features</h2>
          <ul>
            <li>Extensive venue database with photos, capacities, and amenities.</li>
            <li>Real-time availability calendar integration.</li>
            <li>Automated booking requests and confirmations.</li>
            <li>Virtual tours and 360-degree venue views.</li>
            <li>Flexible payment options and cancellation policies.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VenueBooking;
