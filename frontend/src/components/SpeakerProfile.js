import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

const SpeakerProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const formatMemberSince = (dateString) => {
    console.log('Formatting member since with dateString:', dateString);
    if (!dateString) return 'Unknown';
    try {
      let date;
      if (dateString.includes('T')) {
        date = new Date(dateString);
      } else {
        const datePart = dateString.split(' ')[0];
        const [year, month, day] = datePart.split('-').map(Number);
        date = new Date(year, month - 1, day);
      }
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      console.log('Parsed date:', date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }));
      return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    } catch (error) {
      console.error('Error formatting member since date:', error);
      return 'Unknown';
    }
  };

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/speaker/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched speaker profile data:', data);
        setUser(data.user);
        setFormData({
          username: data.user.username,
          email: data.user.email,
          bio: data.user.bio || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          navigate('/speaker/login');
        } else {
          setMessage('Failed to load profile');
        }
      }
    } catch (error) {
      console.error('Error fetching speaker profile:', error);
      setMessage('Error loading profile');
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setMessage('');
  };

  const handleSave = async () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          bio: formData.bio || undefined,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword || undefined
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully');
        setIsEditing(false);
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        fetchProfile(); // Refresh profile data
      } else {
        setMessage(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating speaker profile:', error);
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirm !== 'DELETE') {
      setMessage('Please type "DELETE" to confirm');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ confirm: deleteConfirm })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/speaker/login');
      } else {
        setMessage(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting speaker account:', error);
      setMessage('Error deleting account');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile">
      <nav className="sidebar">
        <ul>
          <li><Link to="/speaker/dashboard"><i className="fa fa-home"></i> Home</Link></li>
          <li><Link to="/speaker/profile"><i className="fa fa-user"></i> Profile</Link></li>
          <li><Link to="/speaker/talks"><i className="fa fa-calendar"></i> Upcoming Talks</Link></li>
          <li><Link to="/speaker/past-events"><i className="fa fa-history"></i> Past Events</Link></li>
          <li><Link to="/speaker/settings"><i className="fa fa-cog"></i> Settings</Link></li>
        </ul>
      </nav>

      <div className="main-content">
        <header className="headers">
          <h1>My Speaker Profile</h1>
        </header>

        <div className="profile-container">
          {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

          <>
            <div className="current-profile">
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
              <button className="btn primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>

            {isEditing && (
              <div className="profilesection">
                <h2>Edit Speaker Profile Information</h2>
                <div className="profile-info">
                  <div className="info-item">
                    <label>Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="info-item">
                    <label>Bio:</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself as a speaker"
                      rows="4"
                    />
                  </div>
                  <div className="info-item">
                    <label>Role:</label>
                    <span>{user.role.toUpperCase()}</span>
                  </div>
                  <div className="info-item">
                    <label>Member Since:</label>
                    <span>{formatMemberSince(user.created_at)}</span>
                  </div>
                  <div className="info-item">
                    <label>User ID:</label>
                    <span>{user.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Account Status:</label>
                    <span className="status-active">Active</span>
                  </div>
                </div>

                <div className="password-section">
                  <h3>Change Password</h3>
                  <div className="profile-info">
                    <div className="info-item">
                      <label>Current Password:</label>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="info-item">
                      <label>New Password:</label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="info-item">
                      <label>Confirm New Password:</label>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="profile-actions">
                  <button onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button onClick={handleCancel} disabled={loading}>Cancel</button>
                </div>
              </div>
            )}
          </>

          <div className="profilesection danger-zone">
            <h2>Danger Zone</h2>
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            <button className="delete-button" onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </button>
          </div>

          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Delete Account</h3>
                <p>This action cannot be undone. Type "DELETE" to confirm:</p>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="Type DELETE"
                />
                <div className="modal-actions">
                  <button onClick={handleDelete} disabled={loading} className="confirm-delete">
                    {loading ? 'Deleting...' : 'Delete Account'}
                  </button>
                  <button onClick={() => { setShowDeleteModal(false); setDeleteConfirm(''); setMessage(''); }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerProfile;
