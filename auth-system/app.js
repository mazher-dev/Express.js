const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const port = 3000;
app.use(express.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const SECRET_KEY = '001001001';

// Helper function to read users
const readUsers = () => {
    const userData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(userData);
};

// Helper function to write users
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Route to register a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    writeUsers(users);
    res.status(201).json({ message: "User registered successfully!" });
});

// Route to login a user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const user = users.find(user => user.username === username);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Unauthorized" });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' }); // Set token expiry
    res.json({ message: "Login successful!", token });
});

// Protected route (dashboard) that requires authentication
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
});

// Middleware to verify the JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

app.listen(port, () => {
    console.log(`User Authentication System is running on http://localhost:${port}`);
});
