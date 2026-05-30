import React from 'react';
import './Hero.css';
import img from '../images/plan_events_2.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();
  // const tryItFreeLink = (user?.role === 'admin' || user?.role === 'speaker') ? '/events/new' : '/events';

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content animate-on-scroll slide-up">
          <h1 className="hero-title">PLAN. MANAGE. <br /> SUCCEED.</h1>
          <p className="hero-subtitle">
            Organize and scale your events effortlessly with our comprehensive event management platform. From planning to execution, we provide the tools to make every event unforgettable.
          </p>
          <div className="hero-actions animate-on-scroll slide-up">
            <Link to="/events" className="btn-primary-large">Browse Events</Link>
            <Link to="/contact" className="btn-secondary-large">Contact Us</Link>
          </div>
        </div>
        <div className="hero-image animate-on-scroll slide-up">
          <img src={img} alt="Hero" height={'450px'} className="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
