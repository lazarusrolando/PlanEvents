import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()
cursor.execute("SELECT id, username, email, created_at FROM users")
rows = cursor.fetchall()
print("Number of users:", len(rows))
print("Columns:", [desc[0] for desc in cursor.description])
for i, row in enumerate(rows):
    print(f"User {i+1}: {row}")
conn.close()
