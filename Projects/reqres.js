app.post('/toys', (req, res) => {
    const newtoys = req.body;
    if(!newtoys.name || !newtoys.color){
        return res.status(400).send('Toy must have a name and color')
    }
    res.status(201).json({ message: "Toy added successfully!", toy: newtoys })
})