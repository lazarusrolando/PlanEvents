import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EventForm.css';

const EventForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [banner, setBanner] = useState(null);
  const [eventType, setEventType] = useState('');
  const [speakers, setSpeakers] = useState([{ name: '', bio: '' }]);
  const [agenda, setAgenda] = useState([{ start_time: '', end_time: '', description: '' }]);
  const [registrationLink, setRegistrationLink] = useState('');
  const [ticketInfo, setTicketInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://127.0.0.1:5000/events/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch event');
          }
          const eventData = await response.json();
          setTitle(eventData.title || '');
          setDate(eventData.date ? eventData.date.split('T')[0] : '');
          setStartTime(eventData.start_time || '');
          setEndTime(eventData.end_time || '');
          setLocation(eventData.location || '');
          setDescription(eventData.description || '');
          setCategory(eventData.category || '');
          setOrganizer(eventData.organizer || '');
          setEventType(eventData.event_type ? eventData.event_type.charAt(0).toUpperCase() + eventData.event_type.slice(1).toLowerCase() : '');
          const parsedSpeakers = eventData.speakers ? JSON.parse(eventData.speakers) : [];
          setSpeakers(Array.isArray(parsedSpeakers) ? parsedSpeakers : [{ name: '', bio: '' }]);
          const parsedAgenda = eventData.agenda ? JSON.parse(eventData.agenda) : [];
          setAgenda(Array.isArray(parsedAgenda) ? parsedAgenda : [{ start_time: '', end_time: '', description: '' }]);
          setRegistrationLink(eventData.registration_link || '');
          setTicketInfo(eventData.ticket_info || '');
        } catch (error) {
          console.error('Error fetching event:', error);
          toast.error('Failed to load event data.');
          navigate('/admin/dashboard');
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('start_time', startTime);
      formData.append('end_time', endTime);
      formData.append('location', location);
      formData.append('category', category);
      formData.append('organizer', organizer);
      if (banner) {
        formData.append('banner', banner);
      }
      formData.append('event_type', eventType);
      formData.append('speakers', JSON.stringify(speakers.filter(s => s.name.trim() !== '')));
      formData.append('agenda', JSON.stringify(agenda.filter(a => a.description.trim() !== '')));
      formData.append('registration_link', registrationLink);
      formData.append('ticket_info', ticketInfo);

      const url = id ? `http://127.0.0.1:5000/events/${id}` : 'http://127.0.0.1:5000/events';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(id ? 'Failed to update event' : 'Failed to create event');
      }

      toast.success(id ? 'Event updated successfully!' : 'Event created successfully!');
      navigate(id ? '/admin/dashboard' : '/events');
    } catch (error) {
      console.error(id ? 'Error updating event:' : 'Error creating event:', error);
      toast.error(id ? 'Failed to update event.' : 'Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-form-container">
      <h2>{id ? 'Edit Event' : 'Create New Event'}</h2>
      {loading && id && <p>Loading event data...</p>}
      <form onSubmit={handleSubmit} className="event-form">
        <label>
          Banner:
          <input type="file" onChange={e => setBanner(e.target.files[0])} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </label>
        <label>
          Start Time:
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
        </label>
        <label>
          End Time:
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} required />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} required />
        </label>
        <label>
          Organizer:
          <input type="text" value={organizer} onChange={e => setOrganizer(e.target.value)} required />
        </label>
        <label>
          Event Type:
          <select value={eventType} onChange={e => setEventType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Festival">Festival</option>
          </select>
        </label>
        <div className="speakers-section">
          <label>Speakers:</label>
          {speakers.map((speaker, index) => (
            <div key={index} className="speaker-item">
              <input
                type="text"
                value={speaker.name}
                onChange={e => { const s = [...speakers]; s[index].name = e.target.value; setSpeakers(s); }}
                placeholder="Speaker Name"
              />
              <input
                type="text"
                value={speaker.bio}
                onChange={e => { const s = [...speakers]; s[index].bio = e.target.value; setSpeakers(s); }}
                placeholder="Speaker Bio"
              />
              <button type="button" onClick={() => { const s = speakers.filter((_, i) => i !== index); setSpeakers(s.length > 0 ? s : [{ name: '', bio: '' }]); }}>Remove</button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => setSpeakers([...speakers, { name: '', bio: '' }])}>Add Speaker</button>
        </div>
        <div className="agenda-section">
          <label>Agenda:</label>
          {agenda.map((item, index) => (
            <div key={index} className="agenda-item">
              <input type="time" value={item.start_time} onChange={e => { const a = [...agenda]; a[index].start_time = e.target.value; setAgenda(a); }} />
              <input type="time" value={item.end_time} onChange={e => { const a = [...agenda]; a[index].end_time = e.target.value; setAgenda(a); }} />
              <input type="text" value={item.description} onChange={e => { const a = [...agenda]; a[index].description = e.target.value; setAgenda(a); }} placeholder="Description" />
              <button type="button" onClick={() => { const a = agenda.filter((_, i) => i !== index); setAgenda(a.length > 0 ? a : [{ start_time: '', end_time: '', description: '' }]); }}>Remove</button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => setAgenda([...agenda, { start_time: '', end_time: '', description: '' }])}>Add Agenda Item</button>
        </div>
        <label className="full-width">
          Registration Link:
          <input type="url" value={registrationLink} onChange={e => setRegistrationLink(e.target.value)} />
        </label>
        <label className="full-width">
          Ticket Info:
          <input type="text" value={ticketInfo} onChange={e => setTicketInfo(e.target.value)} />
        </label>
        <label className="full-width">
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </label>
        <button type="submit" className="submit-button" disabled={loading}>
          {id ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
