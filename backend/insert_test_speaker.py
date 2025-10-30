import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()

# Insert a test speaker
cursor.execute('''
INSERT INTO speakers (username, email, password, bio)
VALUES (?, ?, ?, ?)
''', ('test_speaker', 'speaker@example.com', 'password123', 'Test speaker bio'))

conn.commit()
conn.close()

print("Test speaker inserted successfully.")
