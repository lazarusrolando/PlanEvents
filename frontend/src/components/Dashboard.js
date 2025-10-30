import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClipboard, faGears, faHistory, faHome, faPerson, faTicket } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableEvents, setAvailableEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      const storedRegisteredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
      setRegisteredEvents(storedRegisteredEvents);

      fetch('http://localhost:5000/events')
        .then(response => response.json())
        .then(data => {
          const registeredIds = storedRegisteredEvents.map(e => e.id);
          const available = data.filter(event => !registeredIds.includes(event.id));
          setAvailableEvents(available);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          setAvailableEvents([]);
        });
    }
  }, [user, loading, navigate]);

  const totalEvents = availableEvents.length + registeredEvents.length;
  const totalPercentage = totalEvents > 0 ? Math.round((registeredEvents.length / totalEvents) * 100) : 0;
  const attendedCount = registeredEvents.filter(e => e.checked_in).length;
  const attendedPercentage = registeredEvents.length > 0 ? Math.round((attendedCount / registeredEvents.length) * 100) : 0;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <ul>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome}/> Home</Link></li>
          <li><Link to="/profile"><FontAwesomeIcon icon={faPerson}/>Profile</Link></li>
          <li><Link to="/events"><FontAwesomeIcon icon={faCalendar}/> Upcoming Events</Link></li>
          <li><Link to="/registrations"><FontAwesomeIcon icon={faTicket}/> Tickets</Link></li>
          <li><Link to="/ticketing/attendance"><FontAwesomeIcon icon={faClipboard} /> Attendance</Link></li>
          <li><Link to="/recents"><FontAwesomeIcon icon={faHistory} /> Recents</Link></li>
          <li><Link to="/settings"><FontAwesomeIcon icon={faGears} /> Settings</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="headers">
          <div className="headers-left">
            <h1 style={{ textAlign: 'center' }}>Welcome to User Dashboard</h1>
          </div>
          <div className="headers-right">
            <input
              type="text"
              className="search-input"
              placeholder="Search, visualize, and more"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        <div className="available-events-card">
          <h3>Available Events</h3>
          <p>{availableEvents.length} events available to register for</p>
          <Link to="/events" className="view-available">View Available Events</Link>
        </div>

        <section className="charts-section">
          <div className="chart-container">
            <h3>Total Events</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Registered', value: registeredEvents.length },
                    { name: 'Available', value: availableEvents.length }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell key="registered" fill="#007BFF" />
                  <Cell key="available" fill="#e9ecef" />
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="20" fontWeight="bold">
                  {totalPercentage}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h3>Events Attended</h3>
            {registeredEvents.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Attended', value: attendedCount },
                    { name: 'Not Attended', value: registeredEvents.length - attendedCount }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell key="attended" fill="#28a745" />
                  <Cell key="not-attended" fill="#dc3545" />
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="20" fontWeight="bold">
                  {attendedPercentage}%
                </text>
              </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No events registered yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
