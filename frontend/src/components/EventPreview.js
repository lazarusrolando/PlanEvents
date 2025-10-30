import React from 'react';
import { Link } from 'react-router-dom';
import './EventPreview.css';

const dummyEvents = [
  { id: 1, title: 'Tech Conference 2024', date: '2024-09-15', location: 'San Francisco, CA', category: 'Technology', organizer: 'Tech Innovations Inc.', description: 'A premier conference showcasing the latest advancements in technology, featuring keynote speakers from leading tech companies.' },
  { id: 2, title: 'Music Festival', date: '2024-10-05', location: 'Austin, TX', category: 'Entertainment', organizer: 'Austin Music Group', description: 'An electrifying music festival with performances from top artists across various genres, food vendors, and interactive experiences.' },
];

const EventPreview = () => {
  return (
    <section className="event-preview animate-on-scroll fade-in">
      <div className="event-preview-container">
        <h2 className="event-preview-title animate-on-scroll slide-up">Upcoming Events</h2>
        <div className="event-preview-grid">
          {dummyEvents.map((event, index) => (
            <div key={event.id} className="event-preview-card animate-on-scroll slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p className="event-preview-description">{event.description}</p>
              <Link to={`/events/${event.id}`} className="event-preview-link">View Details</Link>
            </div>
          ))}
        </div>
        <Link to="/events" className="view-all-events-button animate-on-scroll slide-up">View All Events</Link>
      </div>
    </section>
  );
};

export default EventPreview;
