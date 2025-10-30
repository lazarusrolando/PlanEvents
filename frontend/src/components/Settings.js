import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);
    setProfile({
      name: storedUser.username || storedUser.name || '',
      email: storedUser.email || '',
      phone: storedUser.phone || ''
    });
  }, [navigate]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Update user in localStorage and backend if needed
    const updatedUser = { ...user, name: profile.name, email: profile.email, phone: profile.phone };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('New passwords do not match!');
      return;
    }
    // Implement password change logic (e.g., API call)
    alert('Password changed successfully!');
    setPassword({ current: '', new: '', confirm: '' });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="settings">
      <nav className="sidebar">
        <ul>
          <li><Link to="/dashboard"><i className="fa fa-home"></i> Home</Link></li>
          <li><Link to="/profile"><i className="fa fa-user"></i> Profile</Link></li>
          <li><Link to="/events"><i className="fa fa-calendar"></i> Upcoming Events</Link></li>
          <li><Link to="/registrations"><i className="fa fa-ticket"></i> Tickets</Link></li>
          <li><Link to="/ticketing/attendance"><i className="fa fa-check"></i> Attendance</Link></li>
          <li><Link to="/recents"><i className="fa fa-history"></i> Recents</Link></li>
          <li><Link to="/settings"><i className="fa fa-cog"></i> Settings</Link></li>
        </ul>
      </nav>

      <div className="main-content">
        <header className="headers">
          <h1>Settings</h1>
        </header>

        <div className="settings-content">
          <section className="settings-section">
            <h2>Profile Information</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn-primary">Update Profile</button>
            </form>
          </section>

          <section className="settings-section">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label htmlFor="current-password">Current Password</label>
                <input
                  type="password"
                  id="current-password"
                  value={password.current}
                  onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  value={password.new}
                  onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={password.confirm}
                  onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Change Password</button>
            </form>
          </section>

          <section className="settings-section">
            <h2>Notification Preferences</h2>
            <div className="notification-options">
              <label>
                <input
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                />
                Email Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                />
                SMS Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  name="push"
                  checked={notifications.push}
                  onChange={handleNotificationChange}
                />
                Push Notifications
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
