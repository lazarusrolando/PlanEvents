import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import EventDetailsHeader from './EventDetailsHeader';
import './EventDetails.css';

const EventDetails = () => {
     const { id } = useParams();
     const [event, setEvent] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [user, setUser] = useState(null);
     const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          company: '',
          phone: '',
          country: ''
     });
     const [submitStatus, setSubmitStatus] = useState(null);

     useEffect(() => {
          const fetchEvent = async () => {
               try {
                    const response = await fetch(`http://localhost:5000/events/${id}`);
                    if (!response.ok) {
                         throw new Error('Event not found');
                    }
                    const data = await response.json();
                    setEvent(data);
               } catch (err) {
                    setError(err.message);
               } finally {
                    setLoading(false);
               }
          };

          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser) {
               setUser(storedUser);
               setFormData(prev => ({
                    ...prev,
                    email: storedUser.email
               }));
          }

          if (id) {
               fetchEvent();
          }
     }, [id]);

     if (loading) {
          return <div className="event-details-page">Loading...</div>;
     }

     if (error) {
          return <div className="event-details-page">Error: {error}</div>;
     }

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: value
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
               setSubmitStatus('Please enter a valid email.');
               return;
          }
          if (!formData.phone || !/^\+?[\d\s-()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
               setSubmitStatus('Please enter a valid phone number.');
               return;
          }
          try {
               const payload = {
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    phone: formData.phone,
                    ticket_type: 'Standard', // Default ticket type
                    quantity: 1
               };
               const response = await fetch(`http://localhost:5000/events/${id}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
               });
               if (response.ok) {
                    toast.success('Registration successful! Thank you.');
                    setFormData({ firstName: '', lastName: '', email: user ? user.email : '', jobTitle: '', company: '', phone: '', country: '' });

                    // Update localStorage for registered events to display on dashboard
                    const newRegistration = { ...event, checked_in: false };
                    const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
                    if (!registeredEvents.some(reg => reg.id === parseInt(id))) {
                         registeredEvents.push(newRegistration);
                         localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
                    }
               } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Registration failed.');
               }
          } catch (err) {
               setSubmitStatus(`Error: ${err.message}`);
          }
     };

     const formatDate = (dateStr, startTime, endTime) => {
          if (!dateStr) return 'N/A';
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return 'Invalid Date';
          const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
          const monthDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          let timeDisplay = 'Time TBD';
          if (startTime || endTime) {
               if (endTime) {
                    // Format time range in PT
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

     const renderDescription = (description) => {
          if (!description) return <p>No description available.</p>;
          return description.split('\n\n').map((section, index) => {
               const lines = section.trim().split('\n');
               const isBulletList = lines.length > 1 && lines.every(line => line.trim().startsWith('•'));
               if (isBulletList) {
                    return (
                         <ul key={index} className="event-bullets">
                              {lines.map((line, i) => (
                                   <li key={i}>{line.trim().replace(/^•\s*/, '')}</li>
                              ))}
                         </ul>
                    );
               } else {
                    return <p key={index}>{section.trim()}</p>;
               }
          });
     };

     const requirements = (req) => {
          if (!req) return <p>No requirements specified.</p>;
          return req.split('\n\n').map((section, sectionIndex) => {
               const lines = section.trim().split('\n');
               const isBulletList = lines.length > 1 && lines.every(line => line.trim().startsWith('•'));
               if (isBulletList) {
                    return (
                         <ul key={sectionIndex} className="event-bullets">
                              {lines.map((line, i) => (
                                   <li key={i}>{line.trim().replace(/^•\s*/, '')}</li>
                              ))}
                         </ul>
                    );
               } else {
                    return <p key={sectionIndex}>{section.trim()}</p>;
               }
          });
     }

     return (
          <div className="event-details-page">
               <EventDetailsHeader event={event} />
               <div className="event-body">
                    <div className="event-container">
                         <div className="event-info">
                              <div className="event-additional-info">
                                   <p style={{ color: '#333', fontWeight: 'bolder', fontSize: '2em' }}>{formatDate(event?.date, event?.start_time, event?.end_time)}</p>
                                   {renderDescription(event?.description)}
                              </div>
                              <div className="event-details-block">
                                   {event?.location && (
                                        <div className="event-additional-info">
                                             <p><strong>Location: </strong>{event.location}</p>
                                        </div>
                                   )}
                                   <div className="event-additional-info">
                                        <p><strong>Organizer:</strong> {event?.organizer || 'N/A'}</p>
                                        {event?.event_type && <p><strong>Event Type:</strong> {event.event_type}</p>}
                                   </div>
                                   <div className="event-requirements">
                                        <h3 className="section-title">Requirements</h3>
                                        {requirements(event?.requirements)}
                                   </div>
                                   {event?.speakers && (
                                        <div className="speakers-section">
                                             <h3 className="section-title">Speakers</h3>
                                             <ul className="speakers-bullets">
                                                  {JSON.parse(event.speakers).map((speaker, index) => (
                                                       <li key={index} className="speaker-item">
                                                            <strong className="speaker-name">{speaker.name}:</strong>
                                                            <span className="speaker-bio"> {speaker.bio}</span>
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   )}
                                   {event?.agenda && (
                                        <div className="agenda-section">
                                             <h3 className="agenda-title">Agenda</h3>
                                             <table className="agenda-table">
                                                  <tbody>
                                                       {JSON.parse(event.agenda).map((item, index) => (
                                                            <tr key={index} className="agenda-item">
                                                                 <td className="agenda-time">{item.start_time} - {item.end_time}</td>
                                                                 <td className="agenda-topic">{item.description}</td>
                                                            </tr>
                                                       ))}
                                                  </tbody>
                                             </table>
                                        </div>
                                   )}
                              </div>
                         </div>
                         <div className="registration-section">
                              <h3>Register Now</h3>
                              <form onSubmit={handleSubmit} className="registration-form">
                                   <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                             type="text"
                                             id="firstName"
                                             name="firstName"
                                             value={formData.firstName}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                             type="text"
                                             id="lastName"
                                             name="lastName"
                                             value={formData.lastName}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                             type="email"
                                             id="email"
                                             name="email"
                                             value={formData.email}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="jobTitle">Job Title</label>
                                        <select
                                             id="jobTitle"
                                             name="jobTitle"
                                             value={formData.jobTitle}
                                             onChange={handleInputChange}
                                             required
                                        >
                                             <option value="">Select Job Title</option>
                                             <option value="Software Engineer">Software Engineer</option>
                                             <option value="Designer">Designer</option>
                                             <option value="Product Manager">Product Manager</option>
                                             <option value="Marketing Specialist">Marketing Specialist</option>
                                             <option value="Sales Representative">Sales Representative</option>
                                             <option value="Data Analyst">Data Analyst</option>
                                             <option value="HR Manager">HR Manager</option>
                                             <option value="Other">Other</option>
                                        </select>
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="company">Company</label>
                                        <input
                                             type="text"
                                             id="company"
                                             name="company"
                                             value={formData.company}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                             type="tel"
                                             id="phone"
                                             name="phone"
                                             value={formData.phone}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <select
                                             id="country"
                                             name="country"
                                             value={formData.country}
                                             onChange={handleInputChange}
                                             required
                                        >
                                             <option value="">Select your country</option>
                                             <option value="United States">United States</option>
                                             <option value="India">India</option>
                                             <option value="Canada">Canada</option>
                                             <option value="United Kingdom">United Kingdom</option>
                                             <option value="Germany">Germany</option>
                                             <option value="Other">Other</option>
                                        </select>
                                   </div>
                                   <button type="submit" className="register-button">Register Now</button>
                                   {submitStatus && <p className="submit-status">{submitStatus}</p>}
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default EventDetails;
