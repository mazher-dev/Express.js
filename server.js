const express = require("express");
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
    res.send('Welcome to the About Page!');
});

app.get('/user/:username', (req, res) => {
    const username = req.params.username; // Corrected variable name
    res.send(`Hello, ${username}!`); // Use 'username' instead of 'name'
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
