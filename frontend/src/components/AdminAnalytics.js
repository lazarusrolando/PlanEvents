import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './AdminAnalytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalActiveUsers: 0,
    totalUpcomingEvents: 0,
    totalTickets: 0,
    totalRevenue: 0
  });
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchStats();
    fetchEvents();
    fetchTickets();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tickets');
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const eventsByCategory = events.reduce((acc, event) => {
    const category = event.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(eventsByCategory),
    datasets: [
      {
        label: 'Events by Category',
        data: Object.values(eventsByCategory),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Group tickets by month for line chart
  const ticketsByMonth = tickets.reduce((acc, ticket) => {
    const date = new Date(ticket.purchase_date);
    const month = date.toISOString().slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + ticket.quantity;
    return acc;
  }, {});

  const lineData = {
    labels: Object.keys(ticketsByMonth).sort(),
    datasets: [
      {
        label: 'Tickets Sold Over Time',
        data: Object.values(ticketsByMonth),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Analytics Overview',
      },
    },
  };

  if (loading) {
    return <div className="admin-analytics">Loading analytics...</div>;
  }

  return (
    <div className="admin-analytics">
      <div className="admin-sidebar">
        <ul className="admin-sidebar__menu">
          <li className="admin-sidebar__group">
            <Link to="/admin/dashboard" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faHome} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Dashboard</span>
            </Link>
          </li>
          <li className="admin-sidebar__group">
            <Link to="/admin/users" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faUser} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Users</span>
            </Link>
          </li>
          <li className="admin-sidebar__group">
            <Link to="/admin/events" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faCalendar} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Events</span>
            </Link>
          </li>
          <li className="admin-sidebar__group">
            <Link to="/admin/tickets" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faTicket} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Tickets</span>
            </Link>
          </li>
          <li className="admin-sidebar__group">
            <Link to="/admin/analytics" className="admin-sidebar__item active">
              <FontAwesomeIcon icon={faChartSimple} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Analytics</span>
            </Link>
          </li>
          <li className="admin-sidebar__group">
            <Link to="/admin/settings" className="admin-sidebar__item">
              <FontAwesomeIcon icon={faCog} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Admin Analytics</h1>
          <input
            type="text"
            className="search-box"
            placeholder="Search analytics data"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </header>

        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Events</h3>
            <p>{stats.totalEvents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming Events</h3>
            <p>{stats.totalUpcomingEvents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <p>{stats.totalTickets}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>₹{stats.totalRevenue}</p>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-container">
            <h2>Events by Category</h2>
            <Bar data={barData} options={options} />
          </div>
          <div className="chart-container">
            <h2>Tickets Sold Over Time</h2>
            <Line data={lineData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
