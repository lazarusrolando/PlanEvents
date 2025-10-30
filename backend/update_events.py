import sqlite3

conn = sqlite3.connect('events.db')
cursor = conn.cursor()

# Function to map category to event_type
def get_event_type(category):
    if category == 'Tech':
        return 'Conference'
    elif category == 'Music':
        return 'Festival'
    else:
        return 'Event'

# Update rows with invalid values
cursor.execute("""
UPDATE events
SET
    speakers = '[{"name": "Featured Speakers", "bio": "TBA"}]'
WHERE speakers = 'Featured Speakers' OR speakers IS NULL
""")

cursor.execute("""
UPDATE events
SET
    agenda = '[{"time": "TBA", "description": "Detailed agenda to be announced"}]'
WHERE agenda = 'Detailed agenda to be announced' OR agenda IS NULL
""")

cursor.execute("""
UPDATE events
SET
    registration_link = 'https://plan-events.com/register'
WHERE registration_link IS NULL
""")

cursor.execute("""
UPDATE events
SET
    ticket_info = 'Tickets available online'
WHERE ticket_info IS NULL
""")

conn.commit()
print(f"Updated {cursor.rowcount} rows.")

conn.close()
