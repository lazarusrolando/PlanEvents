import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faHome, faUser, faCalendar, faHistory, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import Loading from './Loading';
import './SpeakerSettings.css';

const SpeakerSettings = () => {
  const [settings, setSettings] = useState({
    // Notification Preferences
    enableTalkUpdateEmails: true,
    enableTalkUpdateSMS: false,
    enableReminderEmails: true,
    enableReminderSMS: false,
    enableCancellationEmails: true,
    enableCancellationSMS: true,
    enableNewTalkEmails: true,
    enableFeedbackEmails: true,
    // Profile Visibility
    profileVisibility: 'public',
    showContactInfo: true,
    showBio: true,
    showSocialLinks: true,
    // Talk Preferences
    preferredTopics: '',
    availability: 'flexible',
    maxTalksPerMonth: 5,
    preferredDuration: 60,
    // Account Settings
    emailNotifications: true,
    language: 'en',
    timezone: 'UTC'
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load settings from API
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/speaker/settings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setSettings(prev => ({
            ...prev,
            ...data
          }));
        } else {
          console.error('Failed to load settings');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();

    // Simple speaker check (replace with AuthContext if available)
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'speaker') {
      navigate('/speaker/login');
    }
  }, [navigate]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/speaker/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(settings),
      });
      if (response.ok) {
        toast.success('Speaker settings updated successfully!');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Error saving settings');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="speaker-settings">
      {/* Speaker Sidebar */}
      <div className="speaker-sidebar">
        <ul className="speaker-sidebar__menu">
          <li className="speaker-sidebar__group">
            <Link to="/speaker/dashboard" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Dashboard</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/profile" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faUser} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Profile</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/talks" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faCalendar} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Upcoming Talks</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/past-events" className="speaker-sidebar__item">
              <FontAwesomeIcon icon={faHistory} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Past Events</span>
            </Link>
          </li>
          <li className="speaker-sidebar__group">
            <Link to="/speaker/settings" className="speaker-sidebar__item active">
              <FontAwesomeIcon icon={faCog} className="speaker-sidebar__icon" />
              <span className="speaker-sidebar__text">Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Speaker Settings</h1>
        </header>

        <div className="settings-content">
          {/* Notification Preferences Section */}
          <section className="settings-section">
            <h2>Notification Preferences</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableTalkUpdateEmails"
                    checked={settings.enableTalkUpdateEmails}
                    onChange={handleInputChange}
                  />
                  Enable Talk Update Emails
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableTalkUpdateSMS"
                    checked={settings.enableTalkUpdateSMS}
                    onChange={handleInputChange}
                  />
                  Enable Talk Update SMS
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableReminderEmails"
                    checked={settings.enableReminderEmails}
                    onChange={handleInputChange}
                  />
                  Enable Reminder Emails
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableReminderSMS"
                    checked={settings.enableReminderSMS}
                    onChange={handleInputChange}
                  />
                  Enable Reminder SMS
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableCancellationEmails"
                    checked={settings.enableCancellationEmails}
                    onChange={handleInputChange}
                  />
                  Enable Cancellation Emails
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableCancellationSMS"
                    checked={settings.enableCancellationSMS}
                    onChange={handleInputChange}
                  />
                  Enable Cancellation SMS
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableNewTalkEmails"
                    checked={settings.enableNewTalkEmails}
                    onChange={handleInputChange}
                  />
                  Enable New Talk Invitation Emails
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableFeedbackEmails"
                    checked={settings.enableFeedbackEmails}
                    onChange={handleInputChange}
                  />
                  Enable Feedback Request Emails
                </label>
              </div>
            </form>
          </section>

          {/* Profile Visibility Section */}
          <section className="settings-section">
            <h2>Profile Visibility</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label htmlFor="profileVisibility">Profile Visibility</label>
                <select
                  id="profileVisibility"
                  name="profileVisibility"
                  value={settings.profileVisibility}
                  onChange={handleInputChange}
                >
                  <option value="public">Public</option>
                  <option value="organizers">Organizers Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="showContactInfo"
                    checked={settings.showContactInfo}
                    onChange={handleInputChange}
                  />
                  Show Contact Information
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="showBio"
                    checked={settings.showBio}
                    onChange={handleInputChange}
                  />
                  Show Biography
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="showSocialLinks"
                    checked={settings.showSocialLinks}
                    onChange={handleInputChange}
                  />
                  Show Social Media Links
                </label>
              </div>
            </form>
          </section>

          {/* Talk Preferences Section */}
          <section className="settings-section">
            <h2>Talk Preferences</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label htmlFor="preferredTopics">Preferred Topics (comma-separated)</label>
                <input
                  type="text"
                  id="preferredTopics"
                  name="preferredTopics"
                  value={settings.preferredTopics}
                  onChange={handleInputChange}
                  placeholder="e.g., Technology, Innovation, Leadership"
                />
              </div>
              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <select
                  id="availability"
                  name="availability"
                  value={settings.availability}
                  onChange={handleInputChange}
                >
                  <option value="flexible">Flexible</option>
                  <option value="weekdays">Weekdays Only</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="evenings">Evenings Only</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="maxTalksPerMonth">Maximum Talks per Month</label>
                <input
                  type="number"
                  id="maxTalksPerMonth"
                  name="maxTalksPerMonth"
                  value={settings.maxTalksPerMonth}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferredDuration">Preferred Talk Duration (minutes)</label>
                <input
                  type="number"
                  id="preferredDuration"
                  name="preferredDuration"
                  value={settings.preferredDuration}
                  onChange={handleInputChange}
                  min="15"
                  max="180"
                  step="15"
                  required
                />
              </div>
            </form>
          </section>

          {/* Account Settings Section */}
          <section className="settings-section">
            <h2>Account Settings</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleInputChange}
                  />
                  Enable Email Notifications
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleInputChange}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">Save All Settings</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SpeakerSettings;
