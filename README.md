# Plan Events

<p align="center">
  <img src="https://raw.githubusercontent.com/lazarusrolando/PlanEvents/refs/heads/main/frontend/public/plan_events.png" alt="Plan Events Logo" width="220"/>
</p>

<p align="center">
  <strong>A full-stack event management, planning, ticketing, and role-based dashboard platform.</strong><br/>
  Built with React, Vite, Flask, SQLite, Node.js, and Express.
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.6-blue.svg" alt="React Badge"></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.0.14-purple.svg" alt="Vite Badge"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-Express-green.svg" alt="Node.js Badge"></a>
  <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-API-blue.svg" alt="Flask Badge"></a>
  <a href="https://www.sqlite.org/"><img src="https://img.shields.io/badge/SQLite-Database-green.svg" alt="SQLite Badge"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React.js-19.2.6-blue.svg" alt="React Badge"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-24.10.0-green.svg" alt="Node.js Badge"></a>
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.14.0-yellow.svg" alt="Python Badge"></a>
  <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-3.1.2-blue.svg" alt="Flask Badge"></a>
  <a href="https://www.sqlite.org/"><img src="https://img.shields.io/badge/SQLite-3.50.4-green.svg" alt="SQLite Badge"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License Badge"></a>
</p>

---

## Overview

**Plan Events** is a full-stack platform for planning, publishing, managing, and attending events. It supports public event discovery, event registration, ticket workflows, role-based authentication, admin operations, speaker workspaces, user dashboards, feedback collection, and event analytics.

The application is split into three services:

- **Frontend:** React + Vite single-page application
- **Backend API:** Flask API for events, registrations, tickets, analytics, uploads, and admin settings
- **Auth API:** Node.js + Express service for user/admin/speaker authentication, JWT sessions, profiles, OTP password recovery, and protected admin operations

---

## Key Features

### Public Website

- Landing page with hero, feature cards, event previews, and spotlight content.
- Event listing and event details pages.
- Product pages for planning software, scheduling tools, budget management, team collaboration, venue logistics, venue booking, logistics management, and vendor coordination.
- Ticketing pages for online ticketing, registration forms, payment process, and attendance tracking.
- Company pages for about, teams, awards and recognition, security and trust, contact, newsletter, privacy policy, and terms of service.
- Careers hub with overview, open positions, culture, benefits, inclusion, department pages, interviewing, internships, and job application flow.
- Feedback widget and feedback survey modal.
- Responsive UI with animations, toast notifications, and reusable page styling.

### Event Management

- Create, edit, view, and delete events.
- Store event title, description, date, time, location, category, organizer, event type, speaker data, agenda, requirements, ticket information, registration link, and banner.
- Upload and serve event media through the Flask backend.
- Protected event creation for admin and speaker roles.

### Ticketing, Registration, and Attendance

- Register attendees for events with name, email, phone, ticket type, and quantity.
- Track payment status and check-in status.
- User registration history connected to event data.
- Admin ticket management backed by registration records.
- Attendance check-in endpoint by event and attendee email.

### Role-Based Authentication

- Separate signup and login flows for users, admins, and speakers.
- JWT-based protected routes.
- Forgot-password flow with OTP generation.
- Profile read, update, password change, and account deletion support.
- Shared authentication UI styling across role-based login and signup screens.

### User Dashboard

- Protected user dashboard.
- Profile management.
- Registered tickets/events view.
- Recent activity view.
- User settings page.

### Admin Dashboard

- Protected admin dashboard with operational stats.
- Admin user management, including list, edit, and delete flows.
- Admin event management and event editing.
- Admin ticket management.
- Admin analytics using Chart.js and Recharts.
- Admin settings persistence.
- Audit logs for signups, logins, event changes, user changes, settings changes, and profile updates.

### Speaker Dashboard

- Protected speaker dashboard.
- Speaker profile management with bio support.
- Upcoming talks view.
- Past events view.
- Speaker settings page.
- Speaker event access through the backend speaker events endpoint.

---

## System Architecture

```text
React/Vite Frontend
        |
        | REST requests
        v
Flask Event API  <---- shared SQLite database ---->  Node/Express Auth API
        |                                                   |
        | events, registrations, uploads, stats             | JWT auth, profiles,
        | tickets, admin settings                           | users, admins, speakers
        v                                                   v
SQLite + uploaded media                              Protected role routes
```

---

## Project Structure

```text
PlanEvents/
|-- backend/
|   |-- app.py
|   |-- requirements.txt
|   |-- events.db
|   |-- uploads/
|   |-- create_speakers_table.py
|   |-- insert_test_speaker.py
|   `-- update_events.py
|
|-- backend-auth/
|   |-- server.js
|   |-- package.json
|   `-- package-lock.json
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- contexts/
|   |   |-- images/
|   |   |-- videos/
|   |   |-- App.jsx
|   |   `-- index.jsx
|   |-- vite.config.js
|   |-- vercel.json
|   `-- package.json
|
|-- README.md
`-- LICENSE
```

---

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React 19, Vite 8, React Router | Single-page application and routing |
| UI | CSS modules/files, React Icons, Font Awesome | Page styling, icons, dashboards, responsive layouts |
| Charts | Chart.js, react-chartjs-2, Recharts | Admin and dashboard analytics |
| Notifications | React Toastify | User feedback and status messages |
| Event API | Flask, Flask-CORS | Events, registrations, uploads, stats, tickets, settings |
| Auth API | Node.js, Express, JWT | Login, signup, protected profiles, admin auth operations |
| Database | SQLite | Local relational data store |

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/lazarusrolando/PlanEvents.git
cd PlanEvents
```

### 2. Start the Flask backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Default URL: `http://localhost:5000`

### 3. Start the authentication server

Open a second terminal:

```bash
cd backend-auth
npm install
npm start
```

Default URL: `http://localhost:3001`

### 4. Start the frontend

Open a third terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local frontend URL, usually `http://localhost:5173`.

---

## API Reference

### Flask Event API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/events` | Retrieve all events |
| POST | `/events` | Create an event with JSON or multipart banner upload |
| GET | `/events/<id>` | Retrieve one event |
| PUT | `/events/<id>` | Update an event |
| DELETE | `/events/<id>` | Delete an event |
| POST | `/events/<id>/register` | Register an attendee for an event |
| POST | `/events/<id>/checkin` | Check in an attendee by email |
| POST | `/user/registrations` | Get registrations for a user email |
| PUT | `/user/profile` | Update a user profile in the event database |
| GET | `/api/stats` | Get dashboard totals for events, users, tickets, upcoming events, and revenue |
| GET | `/api/recent-activities` | Get recent registration activity |
| GET | `/api/users` | Get users for admin views |
| PUT | `/api/users/<id>` | Update a user |
| DELETE | `/api/users/<id>` | Delete a user |
| GET | `/api/tickets` | Get ticket records derived from registrations |
| GET | `/api/audit-logs` | Get audit logs |
| GET | `/api/speaker/events` | Get events for speaker views |
| GET/POST | `/api/admin/settings` | Read or save admin settings |
| GET | `/uploads/<filename>` | Serve uploaded event media |

### Node/Express Auth API

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Create user, admin, or speaker accounts based on role |
| POST | `/login` | Log in users and admins |
| POST | `/speaker/login` | Log in speakers |
| POST | `/forgot-password` | Generate an OTP for password recovery |
| GET | `/profile` | Get the authenticated profile |
| PUT | `/profile` | Update profile data or password |
| DELETE | `/profile` | Delete the authenticated account with confirmation |
| GET | `/admin/users` | Admin-only user list |
| GET | `/admin/total-users` | Admin-only total user count |
| GET | `/admin/registrations` | Admin-only registration list |
| GET | `/admin/users/:id` | Admin-only user detail |
| PUT | `/admin/users/:id` | Admin-only user update |
| DELETE | `/admin/users/:id` | Admin-only user deletion |
| GET | `/admin/audit-logs` | Admin-only audit log list |

---

## Database Tables

```sql
users(id, username, email, password, phone, role, created_at)
admins(id, username, email, password, phone, created_at)
speakers(id, username, email, password, bio, created_at)
events(id, banner, title, description, date, start_time, end_time, location,
       category, organizer, event_type, requirements, speakers, agenda,
       registration_link, ticket_info)
registrations(id, event_id, name, email, phone, ticket_type, quantity,
              payment_status, checked_in, created_at)
audit_logs(id, action, details, admin_user, timestamp)
admin_settings(id, key, value, updated_at)
otps(email, otp, expires_at)
```

---

## Useful Commands

```bash
# Frontend
cd frontend
npm run dev
npm run build

# Flask backend
cd backend
python app.py

# Auth backend
cd backend-auth
npm start
npm run dev
```

---

## Notes

- The Flask backend and Node auth server share the SQLite database under `backend/events.db`.
- The frontend expects the Flask API on port `5000` and the auth API on port `3001`.
- Passwords are currently stored as plain text in the local SQLite tables; add hashing before production use.
- Some product, careers, and ticketing pages are frontend workflow pages, while event, ticket, profile, and dashboard features are connected to backend APIs.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
