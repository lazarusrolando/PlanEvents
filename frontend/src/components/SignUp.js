import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SignUp.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleShow = () => setShowPassword(s => !s);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Signup successful!');
        navigate('/login');
      } else {
        toast.error(data.error || 'Signup failed');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    'Get instant access to the Event Management Platform',
    'Ingest and prepare data with automated workflows',
    'Build high-quality event experiences',
    'Query your event data with common tools',
  ];

  return (
    <div className="signup-page">
      <aside className="signup-left">
        <div className="signup-left-inner">
          <h1>Get started with Plan Events</h1>
          <p className="lead">Build AI with all your event data in one place</p>

          <ul className="benefits">
            {perks.map((p, i) => (
              <li key={i}><span className="check">✓</span>{p}</li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="signup-right">
        <div className="signup-card">
          <div className="brand">Plan Events</div>
          <h2>Sign up</h2>
          <p className="muted small">Get started for free</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className='label-input'>Email</label>
              <input
                id="email"
                className="email"
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className='label-input'>Username</label>
              <input
                id="username"
                className="username"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className='label-input'>Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  className={`password ${showPassword ? 'shown' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="show-toggle" onClick={toggleShow} aria-pressed={showPassword} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>

            <div className="actions">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button className="btn primary full" type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <div className="footer-link">Already using Plan Events? <a href="/login">Log in</a></div>
        </div>
      </main>
    </div>
  );
}
