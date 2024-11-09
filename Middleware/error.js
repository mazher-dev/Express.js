const express = require('express');
const app = express();
const port = 3000;


app.get('/cause-error', (req, res) => {
    const error = new Error('Something went wrong');
    error.status = 500 ;
    next(error)
})

app.use((err, req,res, next){
    console.error(err.stack);  // Log the error stack trace to the console

    // Set the response status and send an error message
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
})

app.listen('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

