import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AdminDashboard.css';

const AdminEvents = () => {
     const navigate = useNavigate();
     const [events, setEvents] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          fetchEvents();
     }, []);

     const fetchEvents = async () => {
          try {
               const response = await fetch('http://localhost:5000/events');
               if (!response.ok) {
                    throw new Error('Failed to fetch events');
               }
               const data = await response.json();
               setEvents(data);
          } catch (err) {
               setError(err.message);
          } finally {
               setLoading(false);
          }
     };

     const handleDelete = async (id) => {
          if (!window.confirm('Are you sure you want to delete this event?')) {
               return;
          }
          try {
               const response = await fetch(`http://localhost:5000/events/${id}`, {
                    method: 'DELETE',
               });
               if (!response.ok) {
                    throw new Error('Failed to delete event');
               }
               setEvents(events.filter(event => event.id !== id));
          } catch (err) {
               setError(err.message);
          }
     };

     if (loading) {
          return <div className="admin-dashboard-new">Loading events...</div>;
     }

     if (error) {
          return <div className="admin-dashboard-new">Error: {error}</div>;
     }

     return (
          <div className="admin-dashboard-new">
               <div className="speaker-sidebar">
                    <div className="speaker-sidebar__logo">
                         <span className="speaker-sidebar__logo-text text-center align-center">PlanEvents</span>
                    </div>
                    <p className="speaker-sidebar__section-label">MAIN MENU</p>
                    <ul className="speaker-sidebar__menu">
                         {[
                              { to: '/admin/dashboard', icon: faHome, label: 'Dashboard' },
                              { to: '/admin/users', icon: faUser, label: 'Users' },
                              { to: '/admin/events', icon: faCalendar, label: 'Events' },
                              { to: '/admin/tickets', icon: faTicket, label: 'Tickets' },
                              { to: '/admin/analytics', icon: faChartSimple, label: 'Analytics' },
                              { to: '/admin/settings', icon: faCog, label: 'Settings' },
                         ].map(({ to, icon, label }) => (
                              <li key={to}>
                                   <Link
                                        to={to}
                                        className={`speaker-sidebar__item${window.location.pathname === to ? ' active' : ''}`}
                                   >
                                        <FontAwesomeIcon icon={icon} className="speaker-sidebar__icon" />
                                        <span className="speaker-sidebar__text">{label}</span>
                                   </Link>
                              </li>
                         ))}
                    </ul>
                    <div className="speaker-sidebar__footer">
                         <Link to="/" className="speaker-sidebar__item speaker-sidebar__back">
                              <FontAwesomeIcon icon={faHome} className="speaker-sidebar__icon" />
                              <span className="speaker-sidebar__text">Back to Site</span>
                         </Link>
                    </div>
               </div>

               <div className="main-content">
                    <header className="dashboard-header">
                         <h1>Event Management</h1>
                         <button onClick={() => navigate('/admin/events/new')} className="create-btn"><FontAwesomeIcon icon={faPlus} />Create Event</button>
                    </header>
                    <div className="table-container">
                         <table className="data-table">
                              <thead>
                                   <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {events.map(event => (
                                        <tr key={event.id}>
                                             <td>{event.id}</td>
                                             <td>{event.title}</td>
                                             <td>{event.date}</td>
                                             <td>{event.location}</td>
                                             <td>{event.category}</td>
                                             <td>
                                                  <Link to={`/admin/events/${event.id}/edit`} className="edit-btn"><FontAwesomeIcon icon={faEdit} /></Link>
                                                  <button onClick={() => handleDelete(event.id)} className="delete-btn"><FontAwesomeIcon icon={faTrash} /></button>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default AdminEvents;
