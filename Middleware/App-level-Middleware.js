const express = require('express');
const app = express();
const port = 3000;

// Middleware function to log request details
function logRequest(req, res, next) {
    console.log(`Received ${req.method} request to ${req.url}`);
    next(); // Passes control to the next middleware or route handler
}

// Apply this middleware to all routes
app.use(logRequest);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
