import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AdminDashboard.css';
const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="admin-dashboard-new">Loading users...</div>;
  }

  if (error) {
    return <div className="admin-dashboard-new">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard-new">
      <div className="speaker-sidebar">
        <div className="speaker-sidebar__logo">
          <span className="speaker-sidebar__logo-text text-center align-center">PlanEvents</span>
        </div>
        <p className="speaker-sidebar__section-label">MAIN MENU</p>
        <ul className="speaker-sidebar__menu">
          {[
            { to: '/admin/dashboard', icon: faHome,         label: 'Dashboard' },
            { to: '/admin/users',     icon: faUser,         label: 'Users'     },
            { to: '/admin/events',    icon: faCalendar,     label: 'Events'    },
            { to: '/admin/tickets',   icon: faTicket,       label: 'Tickets'   },
            { to: '/admin/analytics', icon: faChartSimple,  label: 'Analytics' },
            { to: '/admin/settings',  icon: faCog,          label: 'Settings'  },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`speaker-sidebar__item${window.location.pathname === to ? ' active' : ''}`}
              >
                <FontAwesomeIcon icon={icon} className="speaker-sidebar__icon" />
                <span className="speaker-sidebar__text">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="speaker-sidebar__footer">
          <Link to="/" className="speaker-sidebar__item speaker-sidebar__back">
            <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
            <span className="speaker-sidebar__text">Back to Site</span>
          </Link>
        </div>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>User Management</h1>
          <input className="search-box" placeholder='Search your query'/>
        </header>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{user.role}</td>
                  <td>{user.created_at || 'N/A'}</td>
                  <td>
                    <Link to={`/admin/users/${user.id}/edit`} className="edit-btn">Edit</Link>
                    <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
