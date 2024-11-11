const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bcrypt = require('bcrypt');
app.use(express.json());

// Helper function to read users data safely
const readUsersData = () => {
    try {
        const data = fs.readFileSync('users.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or any other issue, return an empty array
        return [];
    }
};

// Register route
app.post('/register', async (req, res) => {
    const users = readUsersData();
    const { username, password } = req.body;

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    // Write users back to the file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(201).json({ message: "User registered successfully!" });
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsersData();

    const user = users.find(user => user.username === username);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Unauthorized" });

    res.send("Login successful!");
});

// Update user route
app.put('/users/:username', (req, res) => {
    const users = readUsersData();
    const user = users.find(u => u.username === req.params.username);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = req.body.newUsername || user.username;
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json({ message: "User updated successfully!" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
