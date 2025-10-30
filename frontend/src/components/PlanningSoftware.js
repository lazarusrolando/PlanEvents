import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css'; // Reuse styling

const PlanningSoftware = () => {
  return (
    <div className="products-container">
      <section className="hero-section" style={{ textAlign: 'center' }}>
        <h1>Event Planning Software</h1>
        <p>Streamline your event planning with our intuitive software designed for organizers of all sizes. From initial concept to final execution, manage every detail effortlessly.</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Drag-and-drop timeline builder for scheduling</li>
          <li>Integrated task assignment and progress tracking</li>
          <li>Customizable templates for different event types</li>
          <li>Real-time collaboration with team members</li>
          <li>Mobile-responsive interface for on-the-go planning</li>
        </ul>
      </section>

      <section className="pricing-section">
        <h2>Pricing</h2>
        <div className="pricing-info">
          <p>Starting at $99/month. Includes unlimited events and team members.</p>
          <Link to="/pricing-calculator" className="btn-primary">Calculate Your Plan</Link>
        </div>
      </section>
    </div>
  );
};

export default PlanningSoftware;
