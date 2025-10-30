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
