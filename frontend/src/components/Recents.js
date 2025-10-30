import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Recents = () => {
     const [user, setUser] = useState(null);
     const [searchTerm, setSearchTerm] = useState('');
     const navigate = useNavigate();

     useEffect(() => {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (!storedUser) {
               navigate('/login');
               return;
          }
          const userData = {
               name: storedUser.username || storedUser.name,
               email: storedUser.email,
               registeredEvents: JSON.parse(localStorage.getItem('registeredEvents')) || []
          };
          setUser(userData);

          // Fetch latest registered events from backend to sync check-in statuses
          const fetchRegistrations = async () => {
               try {
                    const response = await fetch('http://localhost:5000/user/registrations', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ email: userData.email })
                    });
                    if (response.ok) {
                         const registrations = await response.json();
                         // Update state and localStorage with synced data
                         const updatedUser = { ...userData, registeredEvents: registrations };
                         setUser(updatedUser);
                         localStorage.setItem('registeredEvents', JSON.stringify(registrations));
                    } else {
                         console.error('Failed to fetch registrations:', response.statusText);
                         // Fallback to localStorage if fetch fails
                    }
               } catch (err) {
                    console.error('Error fetching registrations:', err);
                    // Fallback to localStorage if fetch fails
               }
          };
          fetchRegistrations();
     }, [navigate]);

     const formatDate = (dateStr, startTime, endTime) => {
          if (!dateStr) return 'N/A';
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return 'Invalid Date';
          const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
          const monthDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          let timeDisplay = 'Time TBD';
          if (startTime || endTime) {
               if (endTime) {
                    // Format time range in IST
                    const startFullStr = `${dateStr}T${startTime}:00`;
                    const endFullStr = `${dateStr}T${endTime}:00`;
                    const startDate = new Date(startFullStr);
                    const endDate = new Date(endFullStr);
                    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                         const startTimeStr = startDate.toLocaleTimeString('en-US', {
                              timeZone: 'Asia/Kolkata',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                         });
                         const endTimeStr = endDate.toLocaleTimeString('en-US', {
                              timeZone: 'Asia/Kolkata',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                         });
                         timeDisplay = `${startTimeStr}-${endTimeStr} IST`;
                    } else {
                         timeDisplay = 'Invalid Time Range';
                    }
               } else if (startTime) {
                    // Fallback to single time in IST
                    const fullTimeStr = `${dateStr}T${startTime}:00`;
                    const timeDate = new Date(fullTimeStr);
                    if (!isNaN(timeDate.getTime())) {
                         timeDisplay = timeDate.toLocaleTimeString('en-US', {
                              timeZone: 'Asia/Kolkata',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                         }) + ' IST';
                    } else {
                         timeDisplay = 'Invalid Time';
                    }
               }
          }
          return `${weekday}, ${monthDay} | ${timeDisplay}`;
     };

     const handleCheckIn = async (eventId) => {
          try {
               const trimmedEmail = (user.email || '').trim();
               const response = await fetch(`http://localhost:5000/events/${eventId}/checkin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: trimmedEmail })
               });
               if (response.ok) {
                    toast.success('Check-in successful!');
                    // Refetch registrations to sync latest check-in status from backend
                    const fetchResponse = await fetch('http://localhost:5000/user/registrations', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ email: trimmedEmail })
                    });
                    if (fetchResponse.ok) {
                         const registrations = await fetchResponse.json();
                         setUser({ ...user, registeredEvents: registrations });
                         localStorage.setItem('registeredEvents', JSON.stringify(registrations));
                    } else {
                         console.error('Failed to refetch registrations after check-in');
                         // Fallback: manually update local state
                         const updatedEvents = user.registeredEvents.map(e =>
                              e.id === eventId ? { ...e, checked_in: true } : e
                         );
                         setUser({ ...user, registeredEvents: updatedEvents });
                         localStorage.setItem('registeredEvents', JSON.stringify(updatedEvents));
                    }
               } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Check-in failed');
               }
          } catch (err) {
               toast.error(`Error: ${err.message}`);
          }
     };

     // Get recent events: sort by date descending, limit to 10
     const getRecentEvents = () => {
          if (!user || !user.registeredEvents) return [];
          return user.registeredEvents
               .sort((a, b) => new Date(b.date) - new Date(a.date))
               .slice(0, 10);
     };

     if (!user) {
          return <div className="loading">Loading...</div>;
     }

     const recentEvents = getRecentEvents();

     return (
          <div className="dashboard">
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

               {/* Main Content */}
               <div className="main-content">
                    {/* Header */}
                    <header className="headers">
                         <div className="headers-left">
                              <h1 style={{ textAlign: 'center' }}>Recent Events</h1>
                         </div>
                         <div className="headers-right">
                              <input
                                   type="text"
                                   className="search-input"
                                   placeholder="Search, visualize, and more"
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                              />
                         </div>
                    </header>

                    <div className='register-container'>
                         <h3>Your Recent Registrations</h3>
                         {recentEvents.length > 0 ? (
                              <div className="registrations-list">
                                   {recentEvents.map(event => (
                                        <div key={event.id} className="registration-item">
                                             <div className="event-info">
                                                  <h4>{event.title}</h4>
                                                  <p>{formatDate(event.date, event.start_time, event.end_time)}</p>
                                                  <p>Location: {event.location || 'N/A'}</p>
                                                  <p>Status: {event.checked_in ? 'Checked In' : 'Pending Check-in'}</p>
                                             </div>
                                             <div className="event-actions">
                                                  <Link to={`/events/${event.id}`} className="view-details-btn">View Details</Link>
                                                  {!event.checked_in && (
                                                       <button onClick={() => handleCheckIn(event.id)} className="checkin-btn">Check In</button>
                                                  )}
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         ) : (
                              <p>No recent events. Check out available events!</p>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default Recents;
