import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM events")
rows = cursor.fetchall()
print("Number of rows:", len(rows))
print("Columns:", [desc[0] for desc in cursor.description])
for i, row in enumerate(rows):
    print(f"Row {i+1}: {row}")
conn.close()
