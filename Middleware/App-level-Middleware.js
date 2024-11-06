const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`Request Type: ${req.method}, Request Url : ${req.url}`);
    next();
});

app.use((req, res, next) => {
    res.setHeader('X-Request-ID', '12345');
    next();
})

app.get('/', (req, res) => {
    res.send('Home Page');
});


app.listen(3000 , () => {
    console.log('Server running on http://localhost:3000')
})