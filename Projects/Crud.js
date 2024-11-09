const express = require('express');
const app = express();

app.use(express.json()); // helps to read JSON data

// GET route: show all toys
app.get('/toys', (req, res) => {
    res.send("Here are all the toys!");
});

// POST route: add a new toy
app.post('/toys', (req, res) => {
    res.send("A new toy has been added!");
});

// PUT route: update an existing toy
app.get('/toys/:id', (req, res) => {
    const toyId = req.params.id;  // Accessing the ID from the URL
    res.send(`Details of toy with ID: ${toyId}`);
});
// DELETE route: remove a toy
app.delete('/toys/:id', (req, res) => {
    res.send(`Toy with id ${req.params.id} has been removed!`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
