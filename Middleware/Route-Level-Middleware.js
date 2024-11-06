const express = require('express');
const app = express();
const PORT = 3000;

const isAuthorized = (req, res, next) => {
    const loggedIn = req.headers['authorization'];
    if(loggedIn){
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

app.get('/profile', isAuthorized, (req, res) => {
    res.send('Profile Page');
})

app.get('/dashboard', isAuthorized, (req, res) => {
    res.send('Dashboard Page');
})

app.get('/', (req, res) => {
    res.send('Public Home Page');
  });


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })