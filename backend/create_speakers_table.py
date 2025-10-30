import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()

# Create speakers table
cursor.execute('''
CREATE TABLE IF NOT EXISTS speakers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    bio TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

conn.commit()
conn.close()

print("Speakers table created successfully.")
