import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './Products.css'; // Reuse styling

const TeamCollaboration = () => {
  return (
    <div className="App">
      <div className="products-container">
        <section className="hero-section">
          <h1>Team Collaboration</h1>
          <p>Enhance team productivity with seamless collaboration tools. Assign tasks, share updates, and communicate in real-time to keep everyone aligned.</p>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Task assignment and role-based permissions</li>
            <li>Real-time chat and comment threads</li>
            <li>Shared document and file management</li>
            <li>Activity feeds and notifications</li>
            <li>Integration with popular communication apps</li>
          </ul>
        </section>

        <section className="pricing-section">
          <h2>Pricing</h2>
          <div className="pricing-info">
            <p>Starting at $59/month. Supports unlimited team members.</p>
            <Link to="/pricing-calculator" className="btn-primary">Calculate Your Plan</Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TeamCollaboration;
