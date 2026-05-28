import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { faHome, faUser, faCalendar, faTicket, faChartSimple, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminTickets = () => {
     const [tickets, setTickets] = useState([]);
     const [filteredTickets, setFilteredTickets] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [searchQuery, setSearchQuery] = useState('');

     useEffect(() => {
          fetchTickets();
     }, []);

     useEffect(() => {
          // Filter tickets based on search query
          const filtered = tickets.filter(ticket =>
               ticket.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               ticket.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
               ticket.status.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredTickets(filtered);
     }, [tickets, searchQuery]);

     const fetchTickets = async () => {
          try {
               const response = await fetch('http://localhost:5000/api/tickets');
               if (!response.ok) {
                    throw new Error('Failed to fetch tickets');
               }
               const data = await response.json();
               setTickets(data);
               setFilteredTickets(data);
          } catch (err) {
               setError(err.message);
          } finally {
               setLoading(false);
          }
     };

     const handleSearchChange = (e) => {
          setSearchQuery(e.target.value);
     };

     if (loading) return <div className="main-content"><p>Loading tickets...</p></div>;
     if (error) return <div className="main-content"><p>Error: {error}</p></div>;

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
                         <h1>Admin Tickets Management</h1>
                         <input
                              type="text"
                              className="search-box"
                              placeholder="Search tickets by event, user, or status"
                              value={searchQuery}
                              onChange={handleSearchChange}
                         />
                    </header>
                    <div className="stats-section">
                         <div className="stat-card">
                              <h3>Total Tickets</h3>
                              <p>{tickets.length}</p>
                         </div>
                         <div className="stat-card">
                              <h3>Active Tickets</h3>
                              <p>{tickets.filter(t => t.status === 'active').length}</p>
                         </div>
                         <div className="stat-card">
                              <h3>Cancelled Tickets</h3>
                              <p>{tickets.filter(t => t.status === 'cancelled').length}</p>
                         </div>
                    </div>
                    <div className="recent-activities">
                         <h2>All Tickets</h2>
                         <table className="activities-table">
                              <thead>
                                   <tr>
                                        <th>Ticket ID</th>
                                        <th>Event</th>
                                        <th>User</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Purchase Date</th>
                                        <th>Actions</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {filteredTickets.map(ticket => (
                                        <tr key={ticket.id}>
                                             <td>{ticket.id}</td>
                                             <td>{ticket.event_name}</td>
                                             <td>{ticket.user_email}</td>
                                             <td>{ticket.quantity}</td>
                                             <td>{ticket.status}</td>
                                             <td>{new Date(ticket.purchase_date).toLocaleDateString()}</td>
                                             <td>
                                                  <button className="btn btn-primary">View</button>
                                                  {/* Add edit/delete buttons if needed */}
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

export default AdminTickets;
