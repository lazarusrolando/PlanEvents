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
                              <Link to="/admin/settings" className="admin-sidebar__item">
                                   <FontAwesomeIcon icon={faCog} className="admin-sidebar__icon" />
                                   <span className="admin-sidebar__text">Settings</span>
                              </Link>
                         </li>
                    </ul>
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
