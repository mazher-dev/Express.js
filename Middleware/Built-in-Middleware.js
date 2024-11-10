const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/submit-json', (req, res) => {
    console.log("Recieved Json Data:", req.body);
    res.send("JSON Data Recieved");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})