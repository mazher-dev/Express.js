const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bcrypt = require('bcrypt');
app.use(express.json())


app.post('/register' , async (req, res) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    const { username, password } = req.body;

    if(user.some(user => user.username === username)){
        return res.status(400).json({ message: "Username already exists"});
    }


    const hasedPassword = await bcrypt.hash(password, 10);
    users.push({ username , password: hasedPassword });
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(201).json({ message: "User registered successfully!"});
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

    const user = users.find(user => user.username === username);
    if(!user ) return res.status(401).json({ message: "Unauthorized"});

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!valid) return res.status(401).json({ message: "Unauthorized"});

    res.send("Login successful!");
})

app.put('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    const user = user.find(u => u.username === username);
    if(!user) return res.status(404).json({ message: "User not found"});

    user.username = req.body.newUsername || user.username;
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.json({ message: "User updated successfully!"}); 
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
