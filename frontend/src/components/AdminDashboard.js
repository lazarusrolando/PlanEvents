import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AdminDashboard.css';

const AdminDashboardNew = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalActiveUsers: 0,
    totalUpcomingEvents: 0,
    totalTickets: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditLogsSearchQuery, setAuditLogsSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchStats();
    fetchRecentActivities();
    fetchAuditLogs();
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

  const fetchRecentActivities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recent-activities');
      if (!response.ok) {
        throw new Error('Failed to fetch recent activities');
      }
      const data = await response.json();
      setRecentActivities(data);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/audit-logs');
      if (!response.ok) {
        throw new Error('Failed to fetch audit logs');
      }
      const data = await response.json();
      setAuditLogs(data);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  return (
    <div className="admin-dashboard-new">
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
            <Link to="/admin/analytics" className="admin-sidebar__item">
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
          <h1>Admin Dashboard Overview</h1>
          <input
            type="text"
            className="search-box"
            placeholder="Search your query"
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
        </div>
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <table className="activities-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Details</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.action}</td>
                  <td>{activity.details}</td>
                  <td>{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="audit-logs">
          <h2>Audit Logs</h2>
          <input
            type="text"
            className="search-box"
            placeholder="Audit Logs by"
            value={auditLogsSearchQuery}
            onChange={(e) => setAuditLogsSearchQuery(e.target.value)}
          />
          <table className="audit-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Details</th>
                <th>Admin User</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const filteredLogs = auditLogs.filter(log =>
                  log.action.toLowerCase().includes(auditLogsSearchQuery.toLowerCase()) ||
                  log.details.toLowerCase().includes(auditLogsSearchQuery.toLowerCase())
                );
                if (filteredLogs.length === 0) {
                  return (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        No audit logs available. Perform an admin action to generate logs.
                      </td>
                    </tr>
                  );
                }
                return filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td>{log.action}</td>
                    <td>{log.details}</td>
                    <td>{log.admin_user}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardNew;
