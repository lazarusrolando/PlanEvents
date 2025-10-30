# Plan Events

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1106453827152007189/1433316987575996517/plan_events.png?ex=69043ff7&is=6902ee77&hm=e586054af838d728e18708efe2a57268399e21bff76c9aaa0eaf54c23e738af5&" alt="Plan Events Logo" width="200"/>
</p>


[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.x-lightgrey.svg)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-green.svg)](https://www.sqlite.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)

A comprehensive full-stack web application for event planning, management, and ticketing. Built with React for the frontend, Flask for the backend API, SQLite for data storage, and a separate Node.js authentication server. It provides tools for creating events, managing registrations, tracking attendance, and more.

## Overview

Plan Events is a modern web platform designed to streamline event organization. It offers a user-friendly interface for browsing and registering for events, an admin dashboard for event management, and a suite of tools for event planning professionals. The application supports multiple user roles (users, admins, speakers) and includes features like online ticketing, venue logistics, budget management, and career opportunities.

## Features

- **Event Management**: Create, view, update, and delete events with detailed information (date, location, speakers, agenda, banners).
- **User Registration & Ticketing**: Register for events, select ticket types, and track registrations.
- **Attendance Tracking**: Check-in attendees and manage event capacity.
- **User Dashboard**: Profile management, view registered events, recent activities, and settings.
- **Role-Based Authentication**: Separate login/signup for users, admins, and speakers with dedicated auth server.
- **Event Planning Tools**: Venue booking, logistics management, vendor coordination, budget tracking, team collaboration.
- **Ticketing System**: Online ticketing, payment processing, registration forms, and feedback surveys.
- **Company Information**: About pages, careers section with job applications, awards recognition, security/trust info.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **File Uploads**: Support for event banners and other media.
- **Audit Logging**: Track admin actions and system changes.
- **Analytics**: Dashboard with stats on events, users, tickets, and revenue.

## Technologies Used

### Frontend
- **React 19.2.0**: Modern JavaScript library for building user interfaces.
- **Material-UI (MUI) 7.3.4**: Component library for consistent design.
- **React Router DOM 7.9.4**: Client-side routing for single-page application.
- **Recharts 3.2.1**: Chart library for data visualization.
- **Chart.js 4.5.1**: Additional charting capabilities.
- **React Toastify 11.0.5**: Notifications and alerts.
- **FontAwesome**: Icons for UI elements.
- **CSS**: Custom styling with animations.

### Backend API (Flask)
- **Flask**: Lightweight Python web framework for API development.
- **SQLite 3.x**: Embedded database for data storage.
- **Flask-CORS**: Cross-origin resource sharing for frontend integration.
- **Python-dotenv**: Environment variable management.
- **Werkzeug**: File upload handling and utilities.
- Additional dependencies: Annotated Types, AnyIO, Boto3, Certifi, etc. (see requirements.txt for full list).

### Authentication Server (Node.js)
- **Node.js 18.x**: Runtime for authentication server.
- **Express.js**: Web framework for the auth API.
- **Additional Node.js dependencies**: See backend-auth/package.json.

### Other
- **Python 3.7+**: Backend runtime.
- **Create React App**: Frontend build setup.
- **npm/yarn**: Package management for frontend and auth server.
- **pip**: Package management for Python backend.

## Prerequisites

- **Node.js** (version 18 or higher)
- **Python** (version 3.7 or higher)
- **npm** or **yarn** (for frontend and auth server dependencies)
- **pip** (for backend dependencies)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd plan-events
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install Python dependencies:
     ```bash
     pip install flask flask-cors python-dotenv werkzeug
     pip install -r requirements.txt
     ```
   - Ensure the `uploads` folder exists for file uploads (it should be present in the repository).

3. **Authentication Server Setup**:
   - Navigate to the backend-auth directory:
     ```bash
     cd ../backend-auth
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```

4. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```

## Running the Application

1. **Start the Authentication Server**:
   - In the `backend-auth` directory:
     ```bash
     npm start
     ```
   - The auth API will run on `http://localhost:3001` (or as configured).

2. **Start the Backend API**:
   - In the `backend` directory:
     ```bash
     python app.py
     ```
   - The API will run on `http://localhost:5000` (or as configured).

3. **Start the Frontend**:
   - In the `frontend` directory:
     ```bash
     npm start
     ```
   - The application will open in your browser at `http://localhost:3000`.

4. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000` (e.g., `http://localhost:5000/events`)
   - Auth Server: `http://localhost:3001`

## Project Structure

```
plan-events/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── events.db              # SQLite database
│   ├── uploads/               # Uploaded files (banners, etc.)
│   ├── check_*.py             # Utility scripts for data validation
│   ├── create_speakers_table.py
│   ├── insert_test_speaker.py
│   └── update_events.py
├── backend-auth/
│   ├── server.js              # Node.js authentication server
│   ├── package.json   ~        # Auth server dependencies
│   └── package-lock.json
├── frontend/
│   ├── public/                # Static assets (HTML, icons, images)
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── plan_events.png
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/        # React components (Header, EventList, etc.)
│   │   │   ├── About.js
│   │   │   ├── Admin*.js      # Admin-related components
│   │   │   ├── Speaker*.js    # Speaker-related components
│   │   │   ├── Event*.js      # Event management components
│   │   │   ├── Login.js, SignUp.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Careers*.js    # Career pages
│   │   │   ├── Contact.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── Loading.js
│   │   │   ├── Newsletter.js
│   │   │   ├── PrivacyPolicy.js
│   │   │   ├── Products.js
│   │   │   ├── Profile.js
│   │   │   ├── Settings.js
│   │   │   ├── TermsOfService.js
│   │   │   ├── Tickets.js
│   │   │   └── ... (many more)
│   │   ├── contexts/
│   │   │   └── AuthContext.js # Authentication context
│   │   ├── images/            # Static images
│   │   ├── videos/            # Static videos
│   │   ├── App.js             # Main React app component
│   │   ├── App.css
│   │   ├── index.js           # React entry point
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   └── animations.css
│   ├── package.json           # Frontend dependencies
│   ├── package-lock.json
│   ├── README.md
│   └── TODO.md
├── package.json               # Root package.json (minimal)
├── package-lock.json
├── README.md                  # This file
├── TODO.md                    # Project tasks and notes
└── events.db                  # Additional database file (possibly root copy)
```

## API Endpoints

The Flask backend provides a RESTful API for event and user management. Key endpoints include:

- `GET /events`: Retrieve all events
- `POST /events`: Create a new event (supports file uploads)
- `GET /events/<id>`: Get event details
- `PUT /events/<id>`: Update an event
- `DELETE /events/<id>`: Delete an event
- `POST /events/<id>/register`: Register for an event
- `POST /events/<id>/checkin`: Check-in an attendee
- `POST /user/registrations`: Get user registrations
- `PUT /user/profile`: Update user profile
- `GET /api/stats`: Get application statistics
- `GET /api/recent-activities`: Get recent user activities
- `GET /api/users`: Retrieve all users (admin)
- `PUT /api/users/<id>`: Update a user (admin)
- `DELETE /api/users/<id>`: Delete a user (admin)
- `GET /api/tickets`: Get all tickets (admin)
- `GET /api/audit-logs`: Get audit logs (admin)
- `GET /api/speaker/events`: Get events for speakers
- `GET /api/admin/settings`: Get admin settings
- `POST /api/admin/settings`: Update admin settings
- `GET /uploads/<filename>`: Serve uploaded files

For detailed API documentation, refer to the backend code in `app.py`.

## Database Schema

The application uses SQLite with the following main tables:

- **users**: User accounts with roles (user, admin, speaker)
- **events**: Event details including metadata and media
- **registrations**: Event registrations with payment and check-in status
- **audit_logs**: Logging of admin actions
- **admin_settings**: Configurable application settings

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

Ensure your code follows the project's coding standards and includes tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
