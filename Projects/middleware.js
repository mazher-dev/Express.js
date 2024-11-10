const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to log the request method and URL
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Endpoint to send the JSON file data
app.get('/resources', (req, res) => {
    const filePath = path.join(__dirname, 'express.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            res.status(500).send("Error reading the file.");
            return;
        }

        // Parse the JSON data and send it as a response
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
