const  express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(express.json());

const filepath = path.join(__dirname,"data" ,'notes.json');

const readNotes = () =>{
    const notesData = fs.readFileSync(filepath , 'utf-8')
    return JSON.parse(notesData)
}

const writeNotes = () =>{
    fs.writeFileSync(filepath, JSON.stringify(notes, null , 2))
}

// Route 1: Get all notes
app.get('/notes', (req, res) =>{
    const notes = readNotes();
    res.join(notes)
})


// Route 2: Get a specific note by ID
app.get('/notes/:id',(req, res) =>{
    const notes = readNotes();
    const note = notes.find(n => n.id === parseInt(req.params.id))
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
})


// Route 3: Add a new note

app.post('/notes', (req, res) => {
    const notes = readNotes();
    const { title, content } = req.body;
    const newNote = { id: Date.now(), title, content };
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json({ message: 'Note created successfully', note: newNote });
});

// Route 4: Update an existing note

app.put('/notes/:id' , (req, res) => {
    
})