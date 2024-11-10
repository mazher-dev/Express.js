const express = require('express');
const app = express();
const port = 3000;

// Basic GET route for a greeting message
app.get('/', (req, res) => {
    res.send("Hello, welcome to our Greeting App!");
});

// GET route for a personalized greeting
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}! Nice to meet you.`);
});

app.listen(port, () => {
    console.log(`Greeting App is running on http://localhost:${port}`);
});
