const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Get all tasks
app.get('/tasks', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
    res.json(tasks);
});


app.post('/tasks', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
    const newTask = { id: Date.now(), name: req.body.name };
    tasks.push(newTask);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
    res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    
    if(task){
        task.name = req.body.name;
        fs.writeFileSync('task.json', JSON.stringify(tasks))
        res.join(task);
    }
    else{
        res.status(404).send("Task Not found ")
    }
})


app.delete('/tasks/:id', (req, res) => {
    let tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
    tasks = tasks.filter(t =>t.id !== parseInt(req.params.id))

    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
    res.status(204).send();
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

