const express = require('express');
const app = express();
const port = 3000;
// Middleware to check if a user is an admin
function checkAdmin(req, res, next) {
    const isAdmin = req.query.admin === 'true'; // Simulate checking if a user is an admin
    if (isAdmin) {
        next(); // Proceed if admin
    } else {
        res.status(403).send("Access denied. Admins only."); // Block if not admin
    }
}

// Apply middleware only to the /admin route
app.get('/admin', checkAdmin, (req, res) => {
    res.send('Welcome, Admin!');
});

app.get('/public', (req, res) => {
    res.send('Public Page - Anyone can access');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});