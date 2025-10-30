import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SpeakerDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHome, faPerson, faHistory, faGears } from '@fortawesome/free-solid-svg-icons';

const SpeakerUpcomingTalks = () => {
     const [upcomingEvents, setUpcomingEvents] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState('');
     const navigate = useNavigate();
     const { user } = useAuth();

     useEffect(() => {
          if (!user || user.role !== 'speaker') {
               navigate('/speaker/login');
               return;
          }

          fetchUpcomingTalks();
     }, [user, navigate]);

     const fetchUpcomingTalks = async () => {
          try {
               setLoading(true);
               const response = await fetch('http://localhost:5000/api/speaker/events', {
                    headers: {
                         'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
               });

               if (!response.ok) {
                    throw new Error('Failed to fetch upcoming talks');
               }

               const data = await response.json();
               // Filter for upcoming events
               const upcoming = data.filter(event => new Date(event.date) > new Date());
               setUpcomingEvents(upcoming);
               setError('');
          } catch (err) {
               console.error('Error fetching upcoming talks:', err);
               setError('Failed to load upcoming talks. Please try again.');
               setUpcomingEvents([]);
          } finally {
               setLoading(false);
          }
     };

     if (loading) {
          return (
               <div className="speaker-dashboard">
                    <nav className="sidebar">
                         <ul>
                              <li><Link to="/speaker/dashboard"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                              <li><Link to="/speaker/profile"><FontAwesomeIcon icon={faPerson} /> Profile</Link></li>
                              <li><Link to="/speaker/talks"><FontAwesomeIcon icon={faCalendar} /> Upcoming Talks</Link></li>
                              <li><Link to="/speaker/past-events"><FontAwesomeIcon icon={faHistory} /> Past Events</Link></li>
                              <li><Link to="/speaker/settings"><FontAwesomeIcon icon={faGears} /> Settings</Link></li>
                         </ul>
                    </nav>
                    <div className="main-content">
                         <header className="headers">
                              <h1>Upcoming Talks</h1>
                         </header>
                         <div className="loading">Loading upcoming talks...</div>
                    </div>
               </div>
          );
     }

     return (
          <div className="speaker-dashboard">
               <nav className="sidebar">
                    <ul>
                         <li><Link to="/speaker/dashboard"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
                         <li><Link to="/speaker/profile"><FontAwesomeIcon icon={faPerson} /> Profile</Link></li>
                         <li><Link to="/speaker/talks"><FontAwesomeIcon icon={faCalendar} /> Upcoming Talks</Link></li>
                         <li><Link to="/speaker/past-events"><FontAwesomeIcon icon={faHistory} /> Past Events</Link></li>
                         <li><Link to="/speaker/settings"><FontAwesomeIcon icon={faGears} /> Settings</Link></li>
                    </ul>
               </nav>

               <div className="main-content">
                    <header className="headers">
                         <h1>Upcoming Talks</h1>
                    </header>

                    {error && <div className="error-message">{error}</div>}

                    <div className="speaker-events">
                         {upcomingEvents.length > 0 ? (
                              <table className="events-table">
                                   <thead>
                                        <tr>
                                             <th>Event Title</th>
                                             <th>Date & Time</th>
                                             <th>Location</th>
                                             <th>Status</th>
                                             <th>Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {upcomingEvents.map(event => (
                                             <tr key={event.id}>
                                                  <td>{event.title}</td>
                                                  <td>{new Date(event.date).toLocaleString()}</td>
                                                  <td>{event.location || 'TBD'}</td>
                                                  <td className="status-upcoming">Upcoming</td>
                                                  <td>
                                                       <Link to={`/events/${event.id}`} className="btn small">View Details</Link>
                                                  </td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         ) : (
                              <div className="no-events">
                                   <p>No upcoming talks scheduled. Check back later!</p>
                                   <Link to="/speaker/dashboard" className="btn">Back to Dashboard</Link>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default SpeakerUpcomingTalks;
