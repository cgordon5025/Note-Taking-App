//importing express

const express = require('express');
const path = require('path')
const notes = require('./db/db.json')
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting up home page
app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'))
// })
//lets retrieve the html page for the basic layout
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))

    // res.json(notes)
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    // res.json(notes)

    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text
        };

        const response = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(response);

    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
