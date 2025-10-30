import React, { useState } from 'react';
import './ForgotPassword.css';

export default function ForgotPassword() {
     const [email, setEmail] = useState('');
     const [message, setMessage] = useState('');
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
          e.preventDefault();
          setMessage('');
          setError('');

          try {
               const response = await fetch('http://localhost:3001/forgot-password', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
               });

               const data = await response.json();

               if (response.ok) {
                    setMessage(data.message);
               } else {
                    setError(data.error);
               }
          } catch (err) {
               setError('An error occurred. Please try again.');
          }
     };

     return (
          <div className="forgot-password-page">
               <aside className="forgot-left">
                    <div className="forgot-left-inner">
                         <h1>Welcome back</h1>
                         <ul className="welcome-bullets">
                              <li><span className="check">✓</span>Quick access to dashboard</li>
                              <li><span className="check">✓</span>Manage attendees and tickets</li>
                              <li><span className="check">✓</span>Secure event tools</li>
                         </ul>
                    </div>
               </aside>

               <main className="forgot-right">
                    <div className="forgot-card">
                         <div className="brand">Plan Events</div>
                         <h2>Forgot Password</h2>
                         <p className="muted small">Enter your email to receive a reset link</p>

                         <form onSubmit={handleSubmit}>
                              <label className="input-label">Email</label>
                              <input
                                   type="email"
                                   className="email"
                                   placeholder="Email"
                                   aria-label="Email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                              />

                              <button type="submit" className="btn primary full">Send Reset Link</button>
                         </form>

                         {message && <p className="success">{message}</p>}
                         {error && <p className="error">{error}</p>}

                         <div className="back-link">
                              <a href="/login">Back to Login</a>
                         </div>
                    </div>
               </main>
          </div>
     );
}
