import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import Loading from './Loading';
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Event Defaults
    defaultEventDuration: 2,
    maxAttendees: 100,
    defaultLocation: 'Online',
    autoApproveEvents: false,
    // Notification Preferences
    enableEventUpdateEmails: true,
    enableEventUpdateSMS: false,
    enableReminderEmails: true,
    enableReminderSMS: false,
    enableCancellationEmails: true,
    enableCancellationSMS: true,
    enableAdminAlerts: true,
    // Payment & Billing
    defaultCurrency: 'INR',
    paymentGateway: 'Gpay',
    refundPolicy: 'within 30 days',
    taxRate: 8.5,
    // System Configuration
    maintenanceMode: false,
    backupFrequency: 'daily',
    apiRateLimit: 1000,
    // Audit & Compliance
    auditLogRetentionDays: 90,
    dataRetentionYears: 3,
    enableGDPRCompliance: true
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load settings from API
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/settings');
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

    // Simple admin check (replace with AuthContext if available)
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      if (response.ok) {
        toast.success('Admin settings updated successfully!');
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
    <div className="admin-settings">
      {/* Admin Sidebar - copied from AdminDashboard for consistency */}
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
            <Link to="/admin/settings" className="admin-sidebar__item active">
              <FontAwesomeIcon icon={faCog} className="admin-sidebar__icon" />
              <span className="admin-sidebar__text">Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>Admin Settings</h1>
        </header>

        <div className="settings-content">
          {/* Event Defaults Section */}
          <section className="settings-section">
            <h2>Event Defaults</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label htmlFor="defaultEventDuration">Default Event Duration (Hours)</label>
                <input
                  type="number"
                  id="defaultEventDuration"
                  name="defaultEventDuration"
                  value={settings.defaultEventDuration}
                  onChange={handleInputChange}
                  min="1"
                  max="24"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="maxAttendees">Maximum Attendees</label>
                <input
                  type="number"
                  id="maxAttendees"
                  name="maxAttendees"
                  value={settings.maxAttendees}
                  onChange={handleInputChange}
                  min="1"
                  max="10000"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="defaultLocation">Default Location</label>
                <input
                  type="text"
                  id="defaultLocation"
                  name="defaultLocation"
                  value={settings.defaultLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="autoApproveEvents"
                    checked={settings.autoApproveEvents}
                    onChange={handleInputChange}
                  />
                  Auto-Approve Events
                </label>
              </div>
            </form>
          </section>

          {/* Notification Preferences Section */}
          <section className="settings-section">
            <h2>Notification Preferences</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableEventUpdateEmails"
                    checked={settings.enableEventUpdateEmails}
                    onChange={handleInputChange}
                  />
                  Enable Event Update Emails
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableEventUpdateSMS"
                    checked={settings.enableEventUpdateSMS}
                    onChange={handleInputChange}
                  />
                  Enable Event Update SMS
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
                    name="enableAdminAlerts"
                    checked={settings.enableAdminAlerts}
                    onChange={handleInputChange}
                  />
                  Enable Admin Alerts for New Registrations
                </label>
              </div>
            </form>
          </section>

          {/* Payment & Billing Section */}
          <section className="settings-section">
            <h2>Payment & Billing</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label htmlFor="defaultCurrency">Default Currency</label>
                <select
                  id="defaultCurrency"
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleInputChange}
                >
                  <option value="USD">INR</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="paymentGateway">Payment Gateway</label>
                <select
                  id="paymentGateway"
                  name="paymentGateway"
                  value={settings.paymentGateway}
                  onChange={handleInputChange}
                >
                  <option value="Stripe">Gpay</option>
                  <option value="PayPal">Paytm</option>
                  <option value="Square">Phone Pe</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="refundPolicy">Refund Policy</label>
                <input
                  type="text"
                  id="refundPolicy"
                  name="refundPolicy"
                  value={settings.refundPolicy}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="taxRate">Tax Rate (%)</label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  value={settings.taxRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
              </div>
            </form>
          </section>

          {/* System Configuration Section */}
          <section className="settings-section">
            <h2>System Configuration</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleInputChange}
                  />
                  Enable Maintenance Mode
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="backupFrequency">Backup Frequency</label>
                <select
                  id="backupFrequency"
                  name="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={handleInputChange}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="apiRateLimit">API Rate Limit (Requests per Hour)</label>
                <input
                  type="number"
                  id="apiRateLimit"
                  name="apiRateLimit"
                  value={settings.apiRateLimit}
                  onChange={handleInputChange}
                  min="100"
                  max="10000"
                  required
                />
              </div>
            </form>
          </section>

          {/* Audit & Compliance Section */}
          <section className="settings-section">
            <h2>Audit & Compliance</h2>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label htmlFor="auditLogRetentionDays">Audit Log Retention (Days)</label>
                <input
                  type="number"
                  id="auditLogRetentionDays"
                  name="auditLogRetentionDays"
                  value={settings.auditLogRetentionDays}
                  onChange={handleInputChange}
                  min="30"
                  max="365"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dataRetentionYears">Data Retention (Years)</label>
                <input
                  type="number"
                  id="dataRetentionYears"
                  name="dataRetentionYears"
                  value={settings.dataRetentionYears}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enableGDPRCompliance"
                    checked={settings.enableGDPRCompliance}
                    onChange={handleInputChange}
                  />
                  Enable GDPR Compliance
                </label>
              </div>
              <button type="submit" className="btn-primary">Save All Settings</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
