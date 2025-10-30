import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Here you could integrate with an email service API
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Stay Updated with Plan Events Newsletter</h2>
        <p className="newsletter-description">
          Subscribe to get the latest event planning tips, industry news, and exclusive offers directly to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-button">Subscribe</button>
        </form>
        <ul className="newsletter-benefits">
          <li>Expert event planning guides</li>
          <li>Upcoming event announcements</li>
          <li>Exclusive discounts on tools</li>
          <li>Industry trends and insights</li>
        </ul>
      </div>
    </section>
  );
};

export default Newsletter;
