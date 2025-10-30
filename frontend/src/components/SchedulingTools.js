import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css'; // Reuse styling

const SchedulingTools = () => {
  return (
    <div className="products-container">
      <section className="hero-section">
        <h1>Scheduling Tools</h1>
        <p>Effortlessly create and manage event schedules with our advanced tools. Coordinate speakers, sessions, and activities in real-time for seamless event flow.</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </section>

      <section className="timeline-section">
        <h2>Sample Event Timeline</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>9:00 AM - Registration Opens</h3>
            <p>Check-in and welcome attendees</p>
          </div>
          <div className="timeline-item">
            <h3>10:00 AM - Keynote Speech</h3>
            <p>Main stage presentation</p>
          </div>
          <div className="timeline-item">
            <h3>11:30 AM - Breakout Sessions</h3>
            <p>Parallel workshops and panels</p>
          </div>
          <div className="timeline-item">
            <h3>1:00 PM - Lunch Break</h3>
            <p>Networking and refreshments</p>
          </div>
          <div className="timeline-item">
            <h3>2:30 PM - Closing Remarks</h3>
            <p>Event wrap-up and Q&A</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Interactive calendar and timeline views with drag-and-drop</li>
          <li>Automated conflict detection and smart rescheduling suggestions</li>
          <li>Advanced session and speaker management with bios and photos</li>
          <li>Fully customizable agendas with branding and print/export to PDF/Excel</li>
          <li>Seamless integration with email, Slack, and push notifications for updates</li>
        </ul>
      </section>

      <section className="pricing-section">
        <h2>Pricing</h2>
        <div className="pricing-info">
          <p>Starting at $79/month. Scalable for events of any complexity, with premium support for large-scale conferences.</p>
          <Link to="/pricing-calculator" className="btn-primary">Calculate Your Plan</Link>
        </div>
      </section>
    </div>
  );
};

export default SchedulingTools;
