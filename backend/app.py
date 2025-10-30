from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

load_dotenv()

app = Flask(__name__)
CORS(app)

DATABASE = os.getenv('DATABASE_URL') or 'events.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def log_action(action, details, admin_user=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO audit_logs (action, details, admin_user)
        VALUES (?, ?, ?)
    """, (action, details, admin_user))
    conn.commit()
    conn.close()

def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            role TEXT DEFAULT 'user'
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            banner TEXT,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT,
            start_time TEXT,
            end_time TEXT,
            location TEXT,
            category TEXT,
            organizer TEXT,
            event_type TEXT,
            requirements TEXT,
            speakers TEXT,
            agenda TEXT,
            registration_link TEXT,
            ticket_info TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            ticket_type TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            payment_status TEXT DEFAULT 'pending',
            checked_in BOOLEAN DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES events (id)
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            action TEXT NOT NULL,
            details TEXT,
            admin_user TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS admin_settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE NOT NULL,
            value TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    print("Tables ensured (created if missing)")

    # Ensure missing columns (safe migration for older DBs)
    cursor.execute("PRAGMA table_info(events)")
    existing_cols = [row['name'] for row in cursor.fetchall()]

    # Check for duplicate columns and migrate if necessary
    has_duplicates = 'eventType' in existing_cols or 'registrationLink' in existing_cols or 'additionalDetails' in existing_cols
    if has_duplicates:
        print("Duplicate columns detected. Migrating table...")
        # Create new table with correct schema
        cursor.execute("""
        CREATE TABLE events_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            banner TEXT,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT,
            start_time TEXT,
            end_time TEXT,
            location TEXT,
            category TEXT,
            organizer TEXT,
            event_type TEXT,
            speakers TEXT,
            agenda TEXT,
            registration_link TEXT,
            ticket_info TEXT,
            requirements TEXT
        )
        """)
        # Copy data, preferring underscored columns
        cursor.execute("""
        INSERT INTO events_new (id, banner, title, description, date, start_time, end_time, location, category, organizer, event_type, speakers, agenda, registration_link, ticket_info, requirements)
        SELECT id, banner, title, description, date, start_time, end_time, location, category, organizer,
               COALESCE(event_type, eventType, 'Event') as event_type,
               speakers,
               agenda,
               COALESCE(registration_link, registrationLink, 'https://plan-events.com/register') as registration_link,
               ticket_info,
               '' as requirements
        FROM events
        """)
        # Drop old table
        cursor.execute("DROP TABLE events")
        # Rename new table
        cursor.execute("ALTER TABLE events_new RENAME TO events")
        conn.commit()
        print("Table migrated. Duplicates removed.")
        # Re-fetch existing_cols after migration
        cursor.execute("PRAGMA table_info(events)")
        existing_cols = [row['name'] for row in cursor.fetchall()]

    # Add any missing columns that the code expects
    if 'category' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN category TEXT")
        conn.commit()
        print("Added missing column: category")
    if 'organizer' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN organizer TEXT")
        conn.commit()
        print("Added missing column: organizer")
    if 'venue' in existing_cols and 'location' not in existing_cols:
        cursor.execute("ALTER TABLE events RENAME COLUMN venue TO location")
        conn.commit()
        print("Renamed venue to location")
    if 'banner' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN banner TEXT")
        conn.commit()
        print("Added missing column: banner")

    if 'event_type' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN event_type TEXT")
        conn.commit()
        print("Added missing column: event_type")
    if 'requirements' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN requirements TEXT")
        conn.commit()
        print("Added missing column: requirements")
    if 'speakers' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN speakers TEXT")
        conn.commit()
        print("Added missing column: speakers")
    if 'agenda' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN agenda TEXT")
        conn.commit()
        print("Added missing column: agenda")
    if 'registration_link' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN registration_link TEXT")
        conn.commit()
        print("Added missing column: registration_link")
    if 'ticket_info' not in existing_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN ticket_info TEXT")
        conn.commit()
        print("Added missing column: ticket_info")

    # Check users table for phone column
    cursor.execute("PRAGMA table_info(users)")
    user_cols = [row['name'] for row in cursor.fetchall()]
    if 'phone' not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN phone TEXT")
        conn.commit()
        print("Added missing column: phone to users")

    # Check registrations table for created_at column and migrate if necessary
    cursor.execute("PRAGMA table_info(registrations)")
    reg_cols = [row['name'] for row in cursor.fetchall()]
    if 'created_at' not in reg_cols:
        print("Missing created_at column in registrations. Migrating table...")
        # Create new table with correct schema including created_at
        cursor.execute("""
        CREATE TABLE registrations_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            ticket_type TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            payment_status TEXT DEFAULT 'pending',
            checked_in BOOLEAN DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES events (id)
        )
        """)
        # Copy data from old table, setting created_at to NULL for existing rows
        cursor.execute("""
        INSERT INTO registrations_new (id, event_id, name, email, phone, ticket_type, quantity, payment_status, checked_in)
        SELECT id, event_id, name, email, phone, ticket_type, quantity, payment_status, checked_in
        FROM registrations
        """)
        # Drop old table
        cursor.execute("DROP TABLE registrations")
        # Rename new table
        cursor.execute("ALTER TABLE registrations_new RENAME TO registrations")
        conn.commit()
        print("Registrations table migrated with created_at column.")

    # Check audit_logs table for column name migration
    cursor.execute("PRAGMA table_info(audit_logs)")
    audit_cols = [row['name'] for row in cursor.fetchall()]
    if 'user' in audit_cols and 'admin_user' not in audit_cols:
        print("Renaming column 'user' to 'admin_user' in audit_logs table...")
        cursor.execute("ALTER TABLE audit_logs RENAME COLUMN user TO admin_user")
        conn.commit()
        print("Column renamed successfully.")

    # Insert initial data only if table is empty
    cursor.execute("SELECT COUNT(*) as cnt FROM events")
    count = cursor.fetchone()[0]
    if count == 0:
        cursor.execute("""
            INSERT INTO events (title, description, date, start_time, end_time, location, category, organizer, banner, event_type, speakers, agenda, registration_link, ticket_info, requirements)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            'Tech Conference 2024',
            'A premier conference showcasing the latest advancements in technology.',
            '2024-09-15',
            '09:00',
            '17:00',
            'San Francisco, CA',
            'Technology',
            'Tech Innovations Inc.',
            'https://via.placeholder.com/600x200?text=Tech+Conference',
            'Conference',
            '[{"name": "John Doe", "bio": "Software Engineer"}]',
            '[{"start_time": "09:00", "end_time": "10:00", "description": "Keynote"}]',
            'https://example.com/register',
            'Early bird tickets available',
            'No specific requirements'
        ))
        cursor.execute("""
            INSERT INTO events (title, description, date, start_time, end_time, location, category, organizer, banner, event_type, speakers, agenda, registration_link, ticket_info, requirements)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            'Music Festival',
            'An electrifying music festival with performances from top artists.',
            '2024-10-05',
            '18:00',
            '22:00',
            'Austin, TX',
            'Entertainment',
            'Austin Music Group',
            'https://via.placeholder.com/600x200?text=Music+Festival',
            'Festival',
            '[{"name": "Jane Smith", "bio": "Singer"}]',
            '[{"start_time": "18:00", "end_time": "20:00", "description": "Main Stage"}]',
            'https://example.com/tickets',
            'VIP tickets available',
            'Bring your dancing shoes'
        ))

        # Insert sample registrations only if table is empty
        cursor.execute("SELECT COUNT(*) as cnt FROM registrations")
        reg_count = cursor.fetchone()[0]
        if reg_count == 0:
            cursor.execute("""
                INSERT INTO registrations (event_id, name, email, phone, ticket_type, quantity, payment_status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (1, 'Alice Johnson', 'alice@example.com', '123-456-7890', 'General', 2, 'paid'))
            cursor.execute("""
                INSERT INTO registrations (event_id, name, email, phone, ticket_type, quantity, payment_status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (1, 'Bob Smith', 'bob@example.com', None, 'VIP', 1, 'pending'))
            cursor.execute("""
                INSERT INTO registrations (event_id, name, email, phone, ticket_type, quantity, payment_status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (2, 'Carol Davis', 'carol@example.com', '098-765-4321', 'General', 1, 'paid'))
            cursor.execute("""
                INSERT INTO registrations (event_id, name, email, phone, ticket_type, quantity, payment_status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (2, 'David Wilson', 'david@example.com', None, 'VIP', 3, 'paid'))
            print("Sample registrations inserted")

        # Insert sample users only if table is empty
        cursor.execute("SELECT COUNT(*) as cnt FROM users")
        user_count = cursor.fetchone()[0]
        if user_count == 0:
            cursor.execute("""
                INSERT INTO users (username, email, password, phone, role)
                VALUES (?, ?, ?, ?, ?)
            """, ('admin', 'admin@example.com', 'adminpass', '000-000-0000', 'admin'))
            cursor.execute("""
                INSERT INTO users (username, email, password, phone, role)
                VALUES (?, ?, ?, ?, ?)
            """, ('user1', 'user1@example.com', 'pass123', '111-222-3333', 'user'))
            cursor.execute("""
                INSERT INTO users (username, email, password, phone, role)
                VALUES (?, ?, ?, ?, ?)
            """, ('user2', 'user2@example.com', 'pass456', None, 'user'))
            print("Sample users inserted")

        conn.commit()
        print("Initial data inserted")

    conn.close()

create_table()

@app.route('/', methods=['GET'])
def index():
    return "Server is running"

@app.route('/events', methods=['GET', 'POST'])
def events():
    print("Events endpoint hit")
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("SELECT * FROM events")
        rows = cursor.fetchall()
        events = [dict(row) for row in rows]
        conn.close()
        return jsonify(events)

    if request.method == 'POST':
        if request.content_type.startswith('multipart/form-data'):
            # Handle file upload
            title = request.form['title']
            description = request.form.get('description')
            date = request.form.get('date')
            start_time = request.form.get('start_time')
            end_time = request.form.get('end_time')
            location = request.form.get('location')
            category = request.form.get('category')
            organizer = request.form.get('organizer')
            event_type = request.form.get('event_type')
            speakers = request.form.get('speakers')
            agenda = request.form.get('agenda')
            registration_link = request.form.get('registration_link')
            ticket_info = request.form.get('ticket_info')
            requirements = request.form.get('requirements')
            banner = None
            if 'banner' in request.files:
                file = request.files['banner']
                if file.filename != '':
                    filename = secure_filename(file.filename)
                    file.save(os.path.join('uploads', filename))
                    banner = filename
        else:
            # Handle JSON
            data = request.get_json()
            title = data['title']
            description = data.get('description')
            date = data.get('date')
            start_time = data.get('start_time')
            end_time = data.get('end_time')
            location = data.get('location')
            category = data.get('category')
            organizer = data.get('organizer')
            event_type = data.get('event_type')
            speakers = data.get('speakers')
            agenda = data.get('agenda')
            registration_link = data.get('registration_link')
            ticket_info = data.get('ticket_info')
            banner = data.get('banner')
            requirements = data.get('requirements')

        cursor.execute("""
            INSERT INTO events (title, description, date, start_time, end_time, location, category, organizer, banner, event_type, speakers, agenda, registration_link, ticket_info, requirements)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (title, description, date, start_time, end_time, location, category, organizer, banner, event_type, speakers, agenda, registration_link, ticket_info, requirements))
        conn.commit()
        log_action('Event Created', f"Event '{title}' created", 'admin@example.com')  # Assuming admin email
        conn.close()
        return jsonify({'message': 'Event created successfully'}), 201

@app.route('/events/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def event(id):
    print("Event by ID endpoint hit")
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("SELECT * FROM events WHERE id = ?", (id,))
        row = cursor.fetchone()
        if row:
            event = dict(row)
            conn.close()
            return jsonify(event)
        else:
            conn.close()
            return jsonify({'message': 'Event not found'}), 404

    if request.method == 'PUT':
        if request.content_type.startswith('multipart/form-data'):
            # Handle file upload
            title = request.form['title']
            description = request.form.get('description')
            date = request.form.get('date')
            start_time = request.form.get('start_time')
            end_time = request.form.get('end_time')
            location = request.form.get('location')
            category = request.form.get('category')
            organizer = request.form.get('organizer')
            event_type = request.form.get('event_type')
            speakers = request.form.get('speakers')
            agenda = request.form.get('agenda')
            registration_link = request.form.get('registration_link')
            ticket_info = request.form.get('ticket_info')
            requirements = request.form.get('requirements')
            banner = None
            if 'banner' in request.files:
                file = request.files['banner']
                if file.filename != '':
                    filename = secure_filename(file.filename)
                    file.save(os.path.join('uploads', filename))
                    banner = filename
        else:
            # Handle JSON
            data = request.get_json()
            title = data['title']
            description = data.get('description')
            date = data.get('date')
            start_time = data.get('start_time')
            end_time = data.get('end_time')
            location = data.get('location')
            category = data.get('category')
            organizer = data.get('organizer')
            event_type = data.get('event_type')
            speakers = data.get('speakers')
            agenda = data.get('agenda')
            registration_link = data.get('registration_link')
            ticket_info = data.get('ticket_info')
            banner = data.get('banner')
            requirements = data.get('requirements')

        cursor.execute("""
            UPDATE events SET title = ?, description = ?, date = ?, start_time = ?, end_time = ?, location = ?, category = ?, organizer = ?, banner = ?, event_type = ?, speakers = ?, agenda = ?, registration_link = ?, ticket_info = ?, requirements = ?
            WHERE id = ?
        """, (title, description, date, start_time, end_time, location, category, organizer, banner, event_type, speakers, agenda, registration_link, ticket_info, requirements, id))
        conn.commit()
        log_action('Event Updated', f"Event '{title}' (ID: {id}) updated", 'admin@example.com')
        conn.close()
        return jsonify({'message': 'Event updated successfully'})

    if request.method == 'DELETE':
        cursor.execute("DELETE FROM events WHERE id = ?", (id,))
        if cursor.rowcount > 0:
            conn.commit()
            log_action('Event Deleted', f"Event ID: {id} deleted", 'admin@example.com')
            conn.close()
            return jsonify({'message': 'Event deleted successfully'})
        else:
            conn.close()
            return jsonify({'message': 'Event not found'}), 404

@app.route('/events/<int:id>/register', methods=['POST'])
def register_event(id):
    print("Register endpoint hit")
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    ticket_type = data.get('ticket_type')
    quantity = data.get('quantity', 1)  # Default to 1 if not provided

    if not all([name, email, ticket_type]):
        return jsonify({'error': 'Missing required fields: name, email, ticket_type'}), 400

    print(f"Registering for event {id} with email: '{email}'")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO registrations (event_id, name, email, phone, ticket_type, quantity, payment_status)
        VALUES (?, ?, ?, ?, ?, ?, 'paid')
    """, (id, name, email, phone, ticket_type, quantity))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/events/<int:id>/checkin', methods=['POST'])
def checkin_event(id):
    print("Checkin endpoint hit")
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    print(f"Email received: '{email}' for event {id}")
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Trim whitespace from email
    email = email.strip()

    conn = get_db_connection()
    cursor = conn.cursor()

    # First, check if registration exists (case-insensitive and trimmed)
    cursor.execute("""
        SELECT id FROM registrations
        WHERE event_id = ? AND LOWER(TRIM(email)) = LOWER(?)
    """, (id, email))
    registration = cursor.fetchone()
    print(f"Registration found: {registration}")

    if not registration:
        conn.close()
        return jsonify({'error': 'No registration found for this email and event'}), 404

    # Update checked_in (case-insensitive and trimmed)
    cursor.execute("""
        UPDATE registrations
        SET checked_in = TRUE
        WHERE event_id = ? AND LOWER(TRIM(email)) = LOWER(?)
    """, (id, email))
    print(f"Rowcount after update: {cursor.rowcount}")
    conn.commit()
    conn.close()
    return jsonify({'message': 'Check-in successful'}), 200

@app.route('/user/registrations', methods=['POST'])
def get_user_registrations():
    print("User registrations endpoint hit")
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Trim whitespace from email
    email = email.strip()

    conn = get_db_connection()
    cursor = conn.cursor()

    # Join registrations and events to get full event details with check-in status
    cursor.execute("""
        SELECT r.id as registration_id, r.checked_in,
               e.id, e.banner, e.title, e.description, e.date, e.start_time, e.end_time,
               e.location, e.category, e.organizer, e.event_type, e.speakers, e.agenda,
               e.registration_link, e.ticket_info, e.requirements
        FROM registrations r
        JOIN events e ON r.event_id = e.id
        WHERE LOWER(TRIM(r.email)) = LOWER(?)
        ORDER BY e.date DESC
    """, (email,))
    rows = cursor.fetchall()
    conn.close()

    # Format as array of event objects with checked_in
    registrations = []
    for row in rows:
        event = dict(row)
        # Remove registration_id from top level, keep checked_in
        event.pop('registration_id', None)
        registrations.append(event)

    return jsonify(registrations), 200

@app.route('/user/profile', methods=['PUT'])
def update_user_profile():
    print("Update user profile endpoint hit")
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    email = data.get('email')
    name = data.get('name')
    phone = data.get('phone')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Trim whitespace
    email = email.strip()

    conn = get_db_connection()
    cursor = conn.cursor()

    # Update user profile
    cursor.execute("""
        UPDATE users SET username = ?, phone = ? WHERE LOWER(TRIM(email)) = LOWER(?)
    """, (name, phone, email))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Profile updated successfully'}), 200

@app.route('/api/stats', methods=['GET'])
def get_stats():
    print("Stats endpoint hit")
    conn = get_db_connection()
    cursor = conn.cursor()

    # Total Events
    cursor.execute("SELECT COUNT(*) as totalEvents FROM events")
    totalEvents = cursor.fetchone()['totalEvents']

    # Total Users
    cursor.execute("SELECT COUNT(*) as totalUsers FROM users")
    totalUsers = cursor.fetchone()['totalUsers']

    # Total Active Users (distinct emails with paid registrations)
    cursor.execute("SELECT COUNT(DISTINCT email) as totalActiveUsers FROM registrations WHERE payment_status = 'paid'")
    totalActiveUsersRow = cursor.fetchone()
    totalActiveUsers = totalActiveUsersRow['totalActiveUsers'] if totalActiveUsersRow['totalActiveUsers'] else 0

    # Total Tickets (sum of quantities for paid registrations)
    cursor.execute("SELECT SUM(quantity) as totalTickets FROM registrations WHERE payment_status = 'paid'")
    totalTicketsRow = cursor.fetchone()
    totalTickets = totalTicketsRow['totalTickets'] if totalTicketsRow['totalTickets'] else 0

    # Total Upcoming Events
    cursor.execute("SELECT COUNT(*) as totalUpcomingEvents FROM events WHERE date >= date('now')")
    totalUpcomingEvents = cursor.fetchone()['totalUpcomingEvents']

    # Total Revenue (assuming $50 per ticket)
    totalRevenue = totalTickets * 50

    conn.close()
    return jsonify({
        'totalEvents': totalEvents,
        'totalUsers': totalUsers,
        'totalActiveUsers': totalActiveUsers,
        'totalTickets': totalTickets,
        'totalUpcomingEvents': totalUpcomingEvents,
        'totalRevenue': totalRevenue
    })

@app.route('/api/recent-activities', methods=['GET'])
def get_recent_activities():
    print("Recent activities endpoint hit")
    conn = get_db_connection()
    cursor = conn.cursor()

    # Fetch recent registrations as activities (last 10)
    cursor.execute("""
        SELECT r.id, r.name, r.email, r.ticket_type, r.quantity, r.payment_status, e.title as event_title, r.created_at
        FROM registrations r
        JOIN events e ON r.event_id = e.id
        ORDER BY r.id DESC
        LIMIT 10
    """)
    rows = cursor.fetchall()
    activities = []
    for row in rows:
        activity = {
            'id': row['id'],
            'action': 'Ticket Purchased' if row['payment_status'] == 'paid' else 'Registration Pending',
            'details': f"{row['name']} ({row['email']}) registered for '{row['event_title']}' - {row['quantity']} {row['ticket_type']} ticket(s)",
            'timestamp': row['created_at'] or 'N/A'
        }
        activities.append(activity)

    conn.close()
    return jsonify(activities)

@app.route('/api/users', methods=['GET'])
def get_users():
    print("Users endpoint hit")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email, phone, role, created_at FROM users")
    rows = cursor.fetchall()
    users = [dict(row) for row in rows]
    conn.close()
    return jsonify(users)

@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    print(f"Delete user endpoint hit for id: {id}")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT username FROM users WHERE id = ?", (id,))
    user = cursor.fetchone()
    if not user:
        conn.close()
        return jsonify({'error': 'User not found'}), 404
    username = user['username']
    cursor.execute("DELETE FROM users WHERE id = ?", (id,))
    conn.commit()
    log_action('User Deleted', f"User '{username}' (ID: {id}) deleted", 'admin@example.com')
    conn.close()
    return jsonify({'message': 'User deleted successfully'})

@app.route('/api/users/<int:id>', methods=['PUT'])
def update_user(id):
    print(f"Update user endpoint hit for id: {id}")
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    username = data.get('username')
    email = data.get('email')
    phone = data.get('phone')
    role = data.get('role')

    if not all([username, email, role]):
        return jsonify({'error': 'Missing required fields: username, email, role'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE users SET username = ?, email = ?, phone = ?, role = ?
        WHERE id = ?
    """, (username, email, phone, role, id))
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'User not found'}), 404
    conn.commit()
    log_action('User Updated', f"User '{username}' (ID: {id}) updated", 'admin@example.com')
    conn.close()
    return jsonify({'message': 'User updated successfully'})

@app.route('/api/tickets', methods=['GET'])
def get_tickets():
    print("Tickets endpoint hit")
    conn = get_db_connection()
    cursor = conn.cursor()

    # Fetch all registrations as tickets, joining with events for event details
    cursor.execute("""
        SELECT r.id, r.event_id, r.name, r.email, r.phone, r.ticket_type, r.quantity, r.payment_status, r.checked_in, r.created_at,
               e.title as event_name
        FROM registrations r
        JOIN events e ON r.event_id = e.id
        ORDER BY r.created_at DESC
    """)
    rows = cursor.fetchall()
    tickets = []
    for row in rows:
        ticket = {
            'id': row['id'],
            'event_name': row['event_name'],
            'user_email': row['email'],
            'quantity': row['quantity'],
            'status': 'active' if row['payment_status'] == 'paid' else 'cancelled',
            'purchase_date': row['created_at']
        }
        tickets.append(ticket)

    conn.close()
    return jsonify(tickets)

@app.route('/api/audit-logs', methods=['GET'])
def get_audit_logs():
    print("Audit logs endpoint hit")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, action, details, admin_user, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT 50")
    rows = cursor.fetchall()
    logs = [dict(row) for row in rows]
    conn.close()
    return jsonify(logs)

@app.route('/api/speaker/events', methods=['GET'])
def get_speaker_events():
    print("Speaker events endpoint hit")
    # TODO: Implement proper authentication and filter by speaker ID
    # For now, return all events (can be filtered client-side)
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events")
    rows = cursor.fetchall()
    events = [dict(row) for row in rows]
    conn.close()
    return jsonify(events)


@app.route('/api/admin/settings', methods=['GET', 'POST'])
def admin_settings():
    print("Admin settings endpoint hit")
    # Basic admin check (in production, use JWT token verification)
    # For now, assume request is from admin (handled by frontend ProtectedAdminRoute)
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("SELECT key, value FROM admin_settings")
        rows = cursor.fetchall()
        settings = {row['key']: row['value'] for row in rows}
        conn.close()
        return jsonify(settings)

    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        for key, value in data.items():
            cursor.execute("""
                INSERT OR REPLACE INTO admin_settings (key, value)
                VALUES (?, ?)
            """, (key, str(value)))
        conn.commit()
        log_action('Admin Settings Updated', f"Settings updated: {list(data.keys())}", 'admin@example.com')
        conn.close()
        return jsonify({'message': 'Settings updated successfully'}), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

if __name__ == '__main__':
    app.run(debug=True)
