const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// GET route for welcome message
app.get('/', (req, res) => {
  res.send('Welcome to my first Express.js server!');
});

// POST route to echo back sent data
app.post('/echo', (req, res) => {
  const receivedData = req.body;  // Access the JSON data sent in request
  res.send(`Received data: ${JSON.stringify(receivedData)}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
