import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()
cursor.execute("SELECT id, username, email, created_at FROM admins")
rows = cursor.fetchall()
print("Number of admins:", len(rows))
print("Columns:", [desc[0] for desc in cursor.description])
for i, row in enumerate(rows):
    print(f"Admin {i+1}: {row}")
conn.close()
