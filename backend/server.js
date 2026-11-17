
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
   password: process.env.DB_PASSWORD || '',
    database: 'portfolio_db',
    port: 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log('MySQL connection failed:', err.message);
        return;
    }

    console.log('MySQL connected successfully!');
});

// Test Route
app.get('/', (req, res) => {
    res.send('Portfolio Backend is running successfully!');
});

// Contact Form API
app.post('/api/contact', (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please fill in all fields.'
        });
    }

    const sql = `
        INSERT INTO contact_messages (name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, message], (err, result) => {

        if (err) {
            console.log('Database error:', err.message);

            return res.status(500).json({
                success: false,
                message: 'Unable to save your message.'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully!'
        });
    });
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
