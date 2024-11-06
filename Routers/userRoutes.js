const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all Users');
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Get User with id: ${id}`);
})

router.post('/', (req, res) => {
    res.send('User created successfully!');
})

module.exports = router;