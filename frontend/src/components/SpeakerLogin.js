import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import './SpeakerLogin.css';

export default function SpeakerLogin() {
     const [showPassword, setShowPassword] = useState(false);
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const { login } = useAuth();

     const toggleShow = () => setShowPassword(s => !s);

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!email || !password) {
               toast.error('Please fill in all fields');
               return;
          }
          setLoading(true);
          try {
               const response = await fetch('http://localhost:3001/speaker/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password, role: 'speaker' })
               });
               const data = await response.json();
               if (response.ok) {
                    login(data.user, data.token);
                    toast.success('Speaker login successful!');
                    navigate('/speaker/dashboard');
               } else {
                    toast.error(data.error || 'Speaker login failed');
               }
          } catch (error) {
               toast.error('Network error');
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="speaker-login-page">
               <aside className="speaker-login-left">
                    <div className="speaker-login-left-inner">
                         <h1>Welcome back, Speaker</h1>
                         <p className="lead">Sign in to manage your presentations</p>

                         <ul className="benefits">
                              <li><span className="check">✓</span>Access speaker dashboard</li>
                              <li><span className="check">✓</span>Manage your talks and events</li>
                              <li><span className="check">✓</span>Secure speaker tools</li>
                         </ul>
                    </div>
               </aside>

               <main className="speaker-login-right">
                    <div className="speaker-login-card">
                         <div className="brand">Plan Events</div>
                         <h2>Speaker Log in</h2>
                         <p className="muted small">Sign in to your speaker account</p>

                         <form onSubmit={handleSubmit}>
                              <label htmlFor="email" className="input-label">Email or Username</label>
                              <input
                                   id="email"
                                   className="email"
                                   placeholder="Email or Username"
                                   aria-label="Email or Username"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                              />
                              <label htmlFor="password" className="input-label">Password</label>
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

                              <div className="actions">
                                   <label className="remember"><input type="checkbox" /> Remember me</label>
                                   <a className="forgot" href="/forgot">Forgot?</a>
                              </div>

                              <button className="btn primary full" type="submit" disabled={loading}>
                                   {loading ? 'Logging in...' : 'Speaker Login'}
                              </button>
                         </form>

                         <div className="signup-link">New speaker? <a href="/speaker/signup">Create a speaker account</a></div>
                    </div>
               </main>
          </div>
     );
}
