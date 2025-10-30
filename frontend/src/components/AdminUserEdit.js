import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog } from '@fortawesome/free-solid-svg-icons';
import './AdminUserEdit.css';

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState({ username: '', email: '', phone: '', role: 'user' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  // const [activeTab, setActiveTab] = useState('users');

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/admin/users/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setError('User not found');
        if (response.status === 403) navigate('/admin/login');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    fetchUser();
  }, [currentUser, fetchUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3001/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          phone: user.phone || '',
          role: user.role
        })
      });

      if (response.ok) {
        alert('User updated successfully!');
        navigate('/admin/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
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

      <div className="admin-main">
        <header className="admin-header">
          <h1>Edit User</h1>
        </header>
        <div className="admin-content">
          <form onSubmit={handleSubmit} className="user-edit-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                value={user.phone || ''}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn primary" disabled={updating}>
                {updating ? 'Updating...' : 'Update User'}
              </button>
              <button type="button" className="btn secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEdit;
