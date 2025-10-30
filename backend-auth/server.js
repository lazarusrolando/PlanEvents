const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(cors());
app.use(express.json());  

// Database setup
const dbPath = path.join(__dirname, '..', 'backend', 'events.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Ensure role and phone columns exist in users table for existing DB
  db.all("PRAGMA table_info(users)", (err, rows) => {
    if (err) {
      console.error('Error checking table info:', err);
    } else {
      if (!rows || !rows.some(row => row.name === 'role')) {
        db.run("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'", (err) => {
          if (err) {
            console.error('Error adding role column:', err);
          } else {
            console.log('Added role column to users table');
          }
        });
      }
      if (!rows || !rows.some(row => row.name === 'phone')) {
        db.run("ALTER TABLE users ADD COLUMN phone TEXT", (err) => {
          if (err) {
            console.error('Error adding phone column:', err);
          } else {
            console.log('Added phone column to users table');
          }
        });
      }
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS speakers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      bio TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS otps (
      email TEXT PRIMARY KEY,
      otp TEXT NOT NULL,
      expires_at DATETIME NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      admin_user TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      details TEXT
    )
  `);

  // Ensure admin_user column exists in audit_logs table for existing DB
  db.all("PRAGMA table_info(audit_logs)", (err, rows) => {
    if (err) {
      console.error('Error checking audit_logs table info:', err);
    } else {
      const hasUser = rows.some(row => row.name === 'user');
      const hasAdminUser = rows.some(row => row.name === 'admin_user');
      if (hasUser && !hasAdminUser) {
        // Rename 'user' to 'admin_user'
        db.run("ALTER TABLE audit_logs ADD COLUMN admin_user_temp TEXT", (err) => {
          if (err) {
            console.error('Error adding temp column:', err);
          } else {
            db.run("UPDATE audit_logs SET admin_user_temp = user", (err) => {
              if (err) {
                console.error('Error copying data:', err);
              } else {
                db.run("ALTER TABLE audit_logs DROP COLUMN user", (err) => {
                  if (err) {
                    console.error('Error dropping old column:', err);
                  } else {
                    db.run("ALTER TABLE audit_logs RENAME COLUMN admin_user_temp TO admin_user", (err) => {
                      if (err) {
                        console.error('Error renaming column:', err);
                      } else {
                        console.log('Renamed user column to admin_user in audit_logs table');
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });

  // Ensure phone column exists in admins table for existing DB
  db.all("PRAGMA table_info(admins)", (err, rows) => {
    if (err) {
      console.error('Error checking admins table info:', err);
    } else {
      if (!rows || !rows.some(row => row.name === 'phone')) {
        db.run("ALTER TABLE admins ADD COLUMN phone TEXT", (err) => {
          if (err) {
            console.error('Error adding phone column to admins:', err);
          } else {
            console.log('Added phone column to admins table');
          }
        });
      }
    }
  });
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  let table;
  if (role === 'admin') {
    table = 'admins';
  } else if (role === 'speaker') {
    table = 'speakers';
  } else {
    table = 'users';
  }

  db.run(
    `INSERT INTO ${table} (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: 'Username or email already exists' });
        }
        console.error('Signup error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const action = role === 'admin' ? 'Admin Signup' : role === 'speaker' ? 'Speaker Signup' : 'User Signup';
      logAuditEvent(action, username, `New ${role} account created: ${username} (${email})`);
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password, role = 'user' } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const table = role === 'admin' ? 'admins' : 'users';

  db.get(
    `SELECT * FROM ${table} WHERE username = ? OR email = ?`,
    [username, username],
    (err, user) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!user) return res.status(401).json({ error: 'Invalid username or password' });

      if (password !== user.password) return res.status(401).json({ error: 'Invalid username or password' });

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const action = role === 'admin' ? 'Admin Login' : 'User Login';
      logAuditEvent(action, username, `Successful login as ${role}`);
      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, email: user.email, role }
      });
    }
  );
});

// Speaker login endpoint
app.post('/speaker/login', (req, res) => {
  const { username, password } = req.body;
  const role = 'speaker';

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const table = 'speakers';

  db.get(
    `SELECT * FROM ${table} WHERE username = ? OR email = ?`,
    [username, username],
    (err, user) => {
      if (err) {
        console.error('Speaker login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!user) return res.status(401).json({ error: 'Invalid username or password' });

      if (password !== user.password) return res.status(401).json({ error: 'Invalid username or password' });

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      logAuditEvent('Speaker Login', username, `Successful login as speaker`);
      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, email: user.email, role }
      });
    }
  );
});

// Forgot password endpoint with OTP
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  db.get(`SELECT 1 as exists FROM (SELECT email FROM users WHERE email = ? UNION SELECT email FROM admins WHERE email = ?)`, [email, email], (err, row) => {
    if (err) {
      console.error('Forgot password DB error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (row) {
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      db.run(`INSERT OR REPLACE INTO otps (email, otp, expires_at) VALUES (?, ?, datetime('now', '+10 minutes'))`, [email, otp], (err) => {
        if (err) {
          console.error('Forgot password DB insert error:', err);
          return res.status(500).json({ error: 'Failed to generate OTP' });
        }

        console.log(`OTP for ${email}: ${otp}`);
        res.json({ message: 'If an account with that email exists, OTP has been sent.' });
      });
    } else {
      // Generic response for security
      res.json({ message: 'If an account with that email exists, OTP has been sent.' });
    }
  });
});

// Get profile
app.get('/profile', verifyToken, (req, res) => {
  const { id, role } = req.user;
  const table = role === 'admin' ? 'admins' : role === 'speaker' ? 'speakers' : 'users';

  let query;
  if (role === 'admin') {
    query = `SELECT id, username, email, phone, created_at FROM ${table} WHERE id = ?`;
  } else if (role === 'speaker') {
    query = `SELECT id, username, email, bio, created_at FROM ${table} WHERE id = ?`;
  } else {
    query = `SELECT id, username, email, phone, role, created_at FROM ${table} WHERE id = ?`;
  }

  db.get(query, [id], (err, user) => {
    if (err) {
      console.error('Profile fetch error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Format created_at to ISO string for consistent frontend parsing
    if (user.created_at) {
      user.created_at = new Date(user.created_at).toISOString();
    }

    // Manually set role for admins and speakers since it's not in the table
    if (role === 'admin') {
      user.role = 'admin';
    } else if (role === 'speaker') {
      user.role = 'speaker';
    }

    res.json({ user });
  });
});

// Update profile
app.put('/profile', verifyToken, (req, res) => {
  const { id, role } = req.user;
  const { username, email, phone, bio, currentPassword, newPassword } = req.body;
  const table = role === 'admin' ? 'admins' : role === 'speaker' ? 'speakers' : 'users';

  // Check for uniqueness if username or email is being changed
  let checkQuery = '';
  let checkParams = [];
  let hasUsernameOrEmailChange = false;
  if (username !== undefined) {
    checkQuery += 'username = ?';
    checkParams.push(username);
    hasUsernameOrEmailChange = true;
  }
  if (email !== undefined) {
    if (checkQuery) checkQuery += ' OR ';
    checkQuery += 'email = ?';
    checkParams.push(email);
    hasUsernameOrEmailChange = true;
  }

  const performUniquenessCheck = (callback) => {
    if (!hasUsernameOrEmailChange) {
      callback(null, null); // No check needed
      return;
    }
    db.get(`SELECT id FROM ${table} WHERE (${checkQuery}) AND id != ?`, [...checkParams, id], (err, existing) => {
      callback(err, existing);
    });
  };

  performUniquenessCheck((err, existing) => {
    if (err) {
      console.error('Uniqueness check error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (existing) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // If newPassword is provided, require and verify currentPassword
    if (newPassword !== undefined && newPassword !== '') {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to change password' });
      }
      db.get(`SELECT password FROM ${table} WHERE id = ?`, [id], (err, user) => {
        if (err) {
          console.error('Password verification error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user || user.password !== currentPassword) {
          return res.status(401).json({ error: 'Invalid current password' });
        }
        performUpdate();
      });
    } else {
      // No password change, proceed directly
      performUpdate();
    }

    function performUpdate() {
      let updateQuery = '';
      let updateParams = [];
      let hasChanges = false;

      if (username !== undefined) {
        updateQuery += 'username = ?, ';
        updateParams.push(username);
        hasChanges = true;
      }
      if (email !== undefined) {
        updateQuery += 'email = ?, ';
        updateParams.push(email);
        hasChanges = true;
      }
      if (phone !== undefined && phone !== '') {
        updateQuery += 'phone = ?, ';
        updateParams.push(phone);
        hasChanges = true;
      } else if (phone === '') {
        // Explicitly set to null/empty if cleared
        updateQuery += 'phone = ?, ';
        updateParams.push(null);
        hasChanges = true;
      }
      if (bio !== undefined && bio !== '') {
        updateQuery += 'bio = ?, ';
        updateParams.push(bio);
        hasChanges = true;
      } else if (bio === '') {
        // Explicitly set to null/empty if cleared
        updateQuery += 'bio = ?, ';
        updateParams.push(null);
        hasChanges = true;
      }
      if (newPassword !== undefined && newPassword !== '') {
        updateQuery += 'password = ?, ';
        updateParams.push(newPassword);
        hasChanges = true;
      }

      if (!hasChanges) {
        return res.json({ message: 'No changes made' });
      }

      if (updateQuery) {
        updateQuery = updateQuery.slice(0, -2); // Remove trailing comma and space
      }

      db.run(`UPDATE ${table} SET ${updateQuery} WHERE id = ?`, [...updateParams, id], function(err) {
        if (err) {
          console.error('Profile update error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (this.changes === 0) {
          return res.json({ message: 'No changes made' });
        }
        logAuditEvent('Profile Update', req.user.username, `Updated profile information`);
        res.json({ message: 'Profile updated successfully' });
      });
    }
  });
});

// Delete profile
app.delete('/profile', verifyToken, (req, res) => {
  const { id, role } = req.user;
  const { confirm } = req.body;
  const table = role === 'admin' ? 'admins' : role === 'speaker' ? 'speakers' : 'users';

  if (confirm !== 'DELETE') {
    return res.status(400).json({ error: 'Confirmation required. Type "DELETE" to confirm.' });
  }

  db.run(`DELETE FROM ${table} WHERE id = ?`, [id], function(err) {
    if (err) {
      console.error('Profile delete error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    logAuditEvent('Account Deletion', req.user.username, `Account deleted by user`);
    res.json({ message: 'Account deleted successfully' });
  });
});

// Admin endpoints
app.get('/admin/users', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  db.all(`SELECT id, username, email, phone, role, created_at FROM users`, (err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(users);
  });
});

app.get('/admin/total-users', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const query = `
    SELECT
      (SELECT COUNT(*) FROM users) +
      (SELECT COUNT(*) FROM admins) as total_users
  `;

  db.get(query, (err, row) => {
    if (err) {
      console.error('Error fetching total users:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ total_users: row.total_users });
  });
});

app.get('/admin/registrations', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const query = `
    SELECT r.id, r.name, r.email, r.phone, r.ticket_type, r.checked_in,
           e.title as event_title, e.date as event_date
    FROM registrations r
    JOIN events e ON r.event_id = e.id
    ORDER BY e.date DESC, r.name ASC
  `;

  db.all(query, (err, registrations) => {
    if (err) {
      console.error('Error fetching registrations:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(registrations);
  });
});

// Admin endpoint to get single user by ID
app.get('/admin/users/:id', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { id } = req.params;

  db.get(`SELECT id, username, email, phone, role, created_at FROM users WHERE id = ?`, [id], (err, user) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// Admin endpoint to update user
app.put('/admin/users/:id', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { id } = req.params;
  const { username, email, phone, role } = req.body;

  // Check for uniqueness if username or email is being changed
  let checkQuery = '';
  let checkParams = [];
  let hasUsernameOrEmailChange = false;
  if (username !== undefined) {
    checkQuery += 'username = ?';
    checkParams.push(username);
    hasUsernameOrEmailChange = true;
  }
  if (email !== undefined) {
    if (checkQuery) checkQuery += ' OR ';
    checkQuery += 'email = ?';
    checkParams.push(email);
    hasUsernameOrEmailChange = true;
  }

  const performUniquenessCheck = (callback) => {
    if (!hasUsernameOrEmailChange) {
      callback(null, null);
      return;
    }
    db.get(`SELECT id FROM users WHERE (${checkQuery}) AND id != ?`, [...checkParams, id], (err, existing) => {
      callback(err, existing);
    });
  };

  performUniquenessCheck((err, existing) => {
    if (err) {
      console.error('Uniqueness check error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (existing) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Build update query
    let updateQuery = '';
    let updateParams = [];
    let hasChanges = false;

    if (username !== undefined) {
      updateQuery += 'username = ?, ';
      updateParams.push(username);
      hasChanges = true;
    }
    if (email !== undefined) {
      updateQuery += 'email = ?, ';
      updateParams.push(email);
      hasChanges = true;
    }
    if (phone !== undefined) {
      updateQuery += 'phone = ?, ';
      updateParams.push(phone || null);
      hasChanges = true;
    }
    if (role !== undefined) {
      updateQuery += 'role = ?, ';
      updateParams.push(role);
      hasChanges = true;
    }

    if (!hasChanges) {
      return res.json({ message: 'No changes made' });
    }

    updateQuery = updateQuery.slice(0, -2); // Remove trailing comma and space

    db.run(`UPDATE users SET ${updateQuery} WHERE id = ?`, [...updateParams, id], function(err) {
      if (err) {
        console.error('User update error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      logAuditEvent('Admin User Update', req.user.username, `Updated user ID ${id}: ${username || email || phone || role}`);
      res.json({ message: 'User updated successfully' });
    });
  });
});

// Admin endpoint to delete user
app.delete('/admin/users/:id', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const { id } = req.params;
  const { confirm } = req.body;

  if (confirm !== 'DELETE') {
    return res.status(400).json({ error: 'Confirmation required. Type "DELETE" to confirm.' });
  }

  // Prevent deleting self (basic check, assuming admin is in admins table)
  if (parseInt(id) === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete your own account' });
  }

  db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
    if (err) {
      console.error('User delete error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    logAuditEvent('Admin User Deletion', req.user.username, `Deleted user ID ${id}`);
    res.json({ message: 'User deleted successfully' });
  });
});

// Admin endpoint to get audit logs
app.get('/admin/audit-logs', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  db.all(`SELECT id, action, admin_user, timestamp, details FROM audit_logs ORDER BY timestamp DESC`, (err, logs) => {
    if (err) {
      console.error('Error fetching audit logs:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(logs);
  });
});

// Helper function to log audit events
const logAuditEvent = (action, user, details) => {
  const now = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000; // UTC+5:30 in milliseconds
  const istTime = new Date(now.getTime() + istOffsetMs);
  
  const pad = (num) => num.toString().padStart(2, '0');
  const year = istTime.getFullYear();
  const month = pad(istTime.getMonth() + 1);
  const day = pad(istTime.getDate());
  const hour = pad(istTime.getHours());
  const minute = pad(istTime.getMinutes());
  const second = pad(istTime.getSeconds());
  
  const istTimestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  
  db.run(`INSERT INTO audit_logs (action, admin_user, details, timestamp) VALUES (?, ?, ?, ?)`, [action, user, details, istTimestamp], (err) => {
    if (err) {
      console.error('Error logging audit event:', err);
    }
  });
};

app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
