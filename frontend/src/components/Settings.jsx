import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClipboard, faGears, faHistory, faHome, faPerson, faTicket } from '@fortawesome/free-solid-svg-icons';
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
      <nav className="speaker-sidebar">
        <div className="speaker-sidebar__logo">
          <span className="speaker-sidebar__logo-text">PlanEvents</span>
        </div>
        <p className="speaker-sidebar__section-label">MAIN MENU</p>
        <ul className="speaker-sidebar__menu">
          <li className="speaker-sidebar__group">
            <Link to="/dashboard" className="speaker-sidebar__item active">
              <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Home</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/profile" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faPerson} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Profile</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/events" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faCalendar} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Upcoming Events</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/registrations" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faTicket} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Tickets</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/ticketing/attendance" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faClipboard} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Attendance</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/recents" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faHistory} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Recents</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/settings" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faGears} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Settings</span>
            </Link>
          </li>
        </ul>
        <div className="speaker-sidebar__footer">
          <Link to="/" className="speaker-sidebar__item speaker-sidebar__back">
            <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
            <span className="speaker-sidebar__text">Back to Site</span>
          </Link>
        </div>
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
