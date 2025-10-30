import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));

    // Check if user is admin
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role === 'admin') {
      setIsAdmin(true);
    }

    // Check for search query in URL
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchTerm(query);
      setActiveTab('upcoming'); // Switch to upcoming tab when searching
    }
  }, [location.search]);

  const getFilteredEvents = () => {
    let filtered = events;

    const today = new Date();
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.date) > today);
    } else if (activeTab === 'featured') {
      filtered = filtered.slice(0, 3);
    } else if (activeTab === 'demand') {
      filtered = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (selectedRegion) {
      filtered = filtered.filter(event => event.location === selectedRegion);
    }

    return filtered;
  };

  const categories = [...new Set(events.map(event => event.category))];
  const regions = [...new Set(events.map(event => event.location))];

  const filteredEvents = getFilteredEvents();

  return (
    <div className="event-list">
      <header className="page-header">
        <video playsInline autoPlay loop muted className="header-video">
          <source src={require('../videos/banner.mp4')} type="video/mp4" />
        </video>
        <div className="header-left">
          <h1>Plan Events - Event Management</h1>
          <p>Explore upcoming events and discover the latest in data</p>
          <button className="btn-view-calendar">View full calendar</button>
        </div>
      </header>
      <div className="tabs">
        <div className="tab-buttons">
          <button
            className={activeTab === 'featured' ? 'active' : ''}
            onClick={() => setActiveTab('featured')}
          >
            Featured
          </button>
          <button
            className={activeTab === 'upcoming' ? 'active' : ''}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={activeTab === 'demand' ? 'active' : ''}
            onClick={() => setActiveTab('demand')}
          >
            Demand
          </button>
        </div>
        <div className="header-right">
          {isAdmin && <Link to="/events/new" className="btn-primary">+ Add Event</Link>}
        </div>
      </div>
      <div className="event-list-container">
        <aside className="sidebars">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter">
            <label>Event Type:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="filter">
            <label>Region:</label>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
              <option value="">All</option>
              {regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
            </select>
          </div>
        </aside>
        <main className="main-content">
          <div className="event-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                {event.banner && <img src={event.banner.startsWith('http') ? event.banner : `http://localhost:5000/uploads/${event.banner}`} alt="Event Banner" className="event-banner" />}
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Organizer:</strong> {event.organizer}</p>
                <Link to={`/events/${event.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventList;
