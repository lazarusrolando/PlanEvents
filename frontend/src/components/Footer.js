import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="cta-section">
        <h2>Ready to plan your perfect event?</h2>
        <p>Take the first steps in your event management journey.</p>
        <div className="cta-buttons">
          <Link to="/events" className="cta-btn primary">Browse Events</Link>
          <Link to="/events/new" className="cta-btn secondary">Try it Free</Link>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-section">
          <h2>Plan Events</h2>
          <p>Organize and scale your events effortlessly with our comprehensive event management platform. From planning to execution, we provide the tools to make every event unforgettable.</p>
        </div>
        <div className="footer-section">
          <h4>Products</h4>
          <ul>
            <li><Link to="/products/planning-software">Planning Software</Link></li>
            <li><Link to="/products/scheduling-tools">Scheduling Tools</Link></li>
            <li><Link to="/products/budget-management">Budget Management</Link></li>
            <li><Link to="/products/team-collaboration">Team Collaboration</Link></li>
            <li><Link to="/ticketing">Ticketing Overview</Link></li>
            <li><Link to="/ticketing/online">Online Ticketing</Link></li>
            <li><Link to="/ticketing/registration">Registration Forms</Link></li>
            <li><Link to="/ticketing/payment">Payment Process</Link></li>
            <li><Link to="/ticketing/attendance">Attendance Tracking</Link></li>
            <li><Link to="/products/venue-booking">Venue Booking</Link></li>
            <li><Link to="/products/logistics-management">Logistics Management</Link></li>
            <li><Link to="/products/vendor-coordination">Vendor Coordination</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers/overview">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@planevents.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Event St, City, State 12345</p>
        </div>
        <br />
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to our newsletter for the latest updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-legal">
        <div className="footer-legal-inner">
          <p className="legal-left">&copy; Plan Events 2025. All rights reserved.</p>
          <div className="legal-links">
            <a href="/privacy">Privacy Notice</a>
            <span className="sep">|</span>
            <a href="/terms">Terms of Use</a>
            <span className="sep">|</span>
            <a href="/privacy-choices">Your Privacy Choices</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
