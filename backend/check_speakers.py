import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()
cursor.execute("PRAGMA table_info(speakers)")
columns = cursor.fetchall()
print("Columns in speakers table:")
for col in columns:
    print(col)

# Check if password_hash column exists, if so, rename to password
cursor.execute("PRAGMA table_info(speakers)")
columns = cursor.fetchall()
column_names = [col[1] for col in columns]
if 'password_hash' in column_names:
    print("Renaming password_hash to password...")
    cursor.execute("ALTER TABLE speakers RENAME COLUMN password_hash TO password")
    conn.commit()
    print("Column renamed successfully.")

cursor.execute("SELECT id, username, email, bio, created_at FROM speakers")
rows = cursor.fetchall()
print("\nNumber of speakers:", len(rows))
print("Columns:", [desc[0] for desc in cursor.description])
for i, row in enumerate(rows):
    print(f"Speaker {i+1}: {row}")

conn.close()
