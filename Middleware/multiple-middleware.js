const express = require('express');
const app = express();
const port = 3000; 

function logRequest(req,res,next){
    console.log(`Request to ${req.url}`)
}

function chechAuth(req,res,next){
    const isauthenticated = req.query.auth === 'true';
    if(isauthenticated){
        next();
    }
    else{
        res.status(401).send('Unauthorized');
    }
}

app.get('/secure', logRequest, chechAuth, (req, res) => {
    res.send('Hello, World!')
})

app.listen(port, () => {    
    console.log(`Server running on http://localhost:${port}`);    
});

// // Middleware to log request details
function logRequest(req, res, next) {
    console.log(`Request to ${req.url}`);
    next();
}
