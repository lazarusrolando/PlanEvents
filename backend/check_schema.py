import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()
cursor.execute("PRAGMA table_info(events)")
columns = cursor.fetchall()
print("Columns in events table:")
for col in columns:
    print(col)
conn.close()
