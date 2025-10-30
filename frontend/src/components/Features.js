import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '📅',
      title: 'Comprehensive Event Planning',
      description: 'Plan every detail of your event with our intuitive tools, from scheduling to resource allocation.'
    },
    {
      icon: '🎟️',
      title: 'Seamless Registration',
      description: 'Manage attendee registrations effortlessly with customizable forms and real-time tracking.'
    },
    {
      icon: '📊',
      title: 'Analytics & Insights',
      description: 'Gain valuable insights into your events with detailed analytics and reporting features.'
    },
    {
      icon: '🤝',
      title: 'Collaborative Management',
      description: 'Work together with your team in real-time to ensure successful event execution.'
    }
  ];

  return (
    <section className="features animate-on-scroll fade-in">
      <div className="features-container">
        <h2 className="features-title">Why Choose Our Event Management Platform?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card animate-on-scroll scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
