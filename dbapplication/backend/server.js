const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve only `index.html` from the `public` folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Database connection
const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// ✅ Create users table if it does not exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
)`, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Table 'users' is ready.");
    }
});

// ✅ API Route to get all users
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// ✅ API Route to add a user
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(sql, [name, email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, email });
    });
});

// ✅ API Route to delete a user
app.delete('/users/:id', (req, res) => {
    const sql = `DELETE FROM users WHERE id = ?`;

    db.run(sql, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
