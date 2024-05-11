const express = require('express');
const jwt = require('jsonwebtoken');
require('nodemon')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

// Secret key for JWT
const secretKey = 'sulopa8799';


// generate any token
const token = jwt.sign({ username: 'admin' }, secretKey);
console.log('generated token',token)

// Middleware to check JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

// API endpoint to return JSON data
app.get('/data', authenticateToken, (req, res) => {
    res.json({ message: 'Authorized', data: { example: 'data' } });
});

// server listening on specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
