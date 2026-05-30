# 🗓️ Plan Events

<p align="center">
  <img src="https://raw.githubusercontent.com/lazarusrolando/PlanEvents/refs/heads/main/frontend/public/plan_events.png" alt="Plan Events Logo" width="220"/>
</p>

<p align="center">
  <strong>A full-stack event management, planning, and ticketing platform.</strong><br/>
  Built with <a href="https://reactjs.org/">React</a> • <a href="https://www.python.org/">Python</a> • <a href="https://flask.palletsprojects.com/">Flask</a> • <a href="https://sqlite.org/">SQLite</a> • <a href="https://nodejs.org/">Node.js</a>
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React.js-19.2.6-blue.svg" alt="React Badge"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-24.10.0-green.svg" alt="Node.js Badge"></a>
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.14.0-yellow.svg" alt="Python Badge"></a>
  <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-3.1.2-blue.svg" alt="Flask Badge"></a>
  <a href="https://www.sqlite.org/"><img src="https://img.shields.io/badge/SQLite-3.50.4-green.svg" alt="SQLite Badge"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License Badge"></a>
</p>


---

## 📖 Overview

**Plan Events** is a **comprehensive full-stack event management system** for organizations, planners, and attendees.  
It integrates **event scheduling, ticketing, user management, analytics, and authentication** into one seamless platform.

> ✨ Built for scalability, modularity, and real-time collaboration — from small meetups to large conferences.

---

## 🚀 Key Features

### 🎫 Event Management
- CRUD operations for events with detailed metadata.
- Supports banners, descriptions, agendas, and multiple speakers.
- File upload support (event banners, media, etc.).

### 👥 User Management
- Role-based access: **User**, **Admin**, **Speaker**.
- Manage profiles, registrations, and event activity logs.

### 💳 Ticketing & Attendance
- Multiple ticket types (free, paid, VIP).
- Registration and real-time attendance tracking.
- Check-in system for admins or event organizers.

### 🧩 Admin Dashboard
- Audit logs, analytics, and system configuration.
- CRUD operations for events, users, and speakers.
- Data visualization with Recharts and Chart.js.

### 🏗️ Planning Tools
- Venue, vendor, and budget management.
- Team collaboration modules and event lifecycle tracking.

### 🌐 General Features
- Responsive and mobile-friendly.
- Real-time notifications (React Toastify).
- Career pages, contact section, privacy policies.
- RESTful API design with modular backend.

---

## 🧱 System Architecture

```text
Frontend (React)        →   Backend API (Flask)    →   Database (SQLite)
        ↓                           ↑
Authentication (Node.js + Express)  |
        ↓                           ↑
     JWT Tokens <—————— Secure REST Communication
```

---

## 📁 Project Structure

```
plan-events/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── events.db
│   ├── uploads/
│   ├── create_speakers_table.py
│   ├── insert_test_speaker.py
│   └── update_events.py
│
├── backend-auth/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   └── package.json
│
├── README.md
└── LICENSE
```

---

## 🧩 Tech Stack

| Layer | Technology | Version | Description |
|-------|-------------|----------|--------------|
| Frontend | React | 19.2.0 | SPA with modern UI |
| Frontend | Material-UI | 7.3.4 | Component styling & theme |
| Backend | Flask | 3.x | RESTful API |
| Database | SQLite | 3.x | Embedded lightweight database |
| Authentication | Node.js + Express | 18.x | JWT-based auth microservice |
| Visualization | Chart.js / Recharts | 4.5.1 / 3.2.1 | Analytics visualization |
| Notifications | React Toastify | 11.0.5 | Event-driven alerts |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/lazarusrolando/PlanEvents.git
cd plan-events
```

### 2️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Runs on: `http://localhost:5000`

### 3️⃣ Authentication Server
```bash
cd ../backend-auth
npm install
node .
```
Runs on: `http://localhost:3001`

### 4️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Runs on: `http://localhost:3000`

---

## 🧠 API Reference (Flask Backend)

| Method | Endpoint | Description |
|--------|-----------|--------------|
| **GET** | `/events` | Retrieve all events |
| **POST** | `/events` | Create new event (supports file uploads) |
| **GET** | `/events/<id>` | Get event details |
| **PUT** | `/events/<id>` | Update existing event |
| **DELETE** | `/events/<id>` | Delete an event |
| **POST** | `/events/<id>/register` | Register user for event |
| **POST** | `/events/<id>/checkin` | Check in attendee |
| **GET** | `/api/stats` | Retrieve event statistics |
| **GET** | `/api/users` | Get list of all users (admin only) |
| **PUT** | `/api/users/<id>` | Update user info |
| **DELETE** | `/api/users/<id>` | Remove user |
| **GET** | `/api/audit-logs` | View admin activity logs |
| **GET** | `/uploads/<filename>` | Retrieve uploaded media |

> 💡 For advanced details, refer to `backend/app.py`.

---

## 🗄️ Database Schema Overview

```sql
TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT,
  email TEXT,
  password_hash TEXT,
  role TEXT
);

TABLE events (
  id INTEGER PRIMARY KEY,
  title TEXT,
  date TEXT,
  location TEXT,
  description TEXT,
  banner TEXT
);

TABLE registrations (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  event_id INTEGER,
  status TEXT,
  payment_status TEXT
);

TABLE audit_logs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  action TEXT,
  timestamp TEXT
);
```

---

## 📊 Admin Dashboard Highlights

- **Analytics:** Attendee count, ticket sales, and revenue graphs  
- **Audit Logs:** Tracks admin-level changes  
- **User Management:** CRUD with access control  
- **Settings Panel:** Configurable branding and limits  
- **Export Tools:** CSV/Excel export (planned)

---

## 🧰 Developer Notes

- **Frontend Build:** `npm run build`
- **Backend Run:** `flask run`
- **Testing:** PyTest (backend), Jest (frontend)
- **Linting:** ESLint + Prettier / Flake8
- **Planned Features:**
  - Stripe payment integration  
  - Email notification system  
  - AI-based recommendations  
  - Multi-language (i18n) support  

---

## 🧑‍💻 Contributing

We ❤️ community contributions!

1. Fork this repository  
2. Create a branch:  
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:  
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:  
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a Pull Request 🚀

> Please follow code style conventions and include appropriate test coverage.

---

## 🧾 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more details.

---

## 🌟 Acknowledgements

- **React & Flask** ecosystems  
- **Material UI**, **Chart.js**, and **Recharts** for design & visualization  
- **SQLite** for simplicity and portability  
- The open-source community ❤️

---

## 💡 Summary

**Plan Events** provides a full-stack, production-ready system for event creation, ticketing, user management, and analytics —  
designed for real-world scalability and maintainability.

> “Plan smarter. Manage better. Host brilliantly.” 🪩
