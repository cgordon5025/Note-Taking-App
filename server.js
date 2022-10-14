//importing express
const express = require('express');
//path importing
const path = require('path')
//importing fs to write and read the files
const fs = require('fs')
//importing this from activities to create a unique id for the items
const uuid = require('./helpers/uuid');
const app = express();
//Old port for testing
// const PORT = 3001;
//Port for Heroku
//use the established port on HEROKU, if not use 3001 as the port
//allows us to connect to their servers and an available port
const PORT = process.env.PORT || 3001;

//setting up home page
app.use(express.static('public'))
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//lets retrieve the html page for the basic layout
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))

    // res.json(notes)
})

//linking in the json file with previous notes
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))

    // res.json(notes)
})
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    // res.json(notes)
    //deconstruct it first 
    const { title, text } = req.body;
    console.log(title, text)
    //check we have it
    // console.log(title, text)
    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text
        };
        //adding a unique ID to the object newNote
        newNote.id = uuid()
        //call down the list we have 
        fs.readFile("./db/db.json", function (err, data) {

            // Check for errors
            if (err) throw err;

            // Converting to JSON
            const noteList = JSON.parse(data);
            noteList.push(newNote)
            console.log(noteList);
            //trying to write file
            fs.writeFile('./db/db.json', JSON.stringify(noteList, null, 4), (err) =>
                err ? console.error(err) : console.log('Written file!'))
            res.json(noteList);
        })
    }

})

app.delete('/api/notes/:id', (req, res) => {
    console.log('delete button clicked')
    //lets call back down the file
    fs.readFile("./db/db.json", function (err, data) {

        // Check for errors
        if (err) throw err;

        // Converting to JSON
        const noteList = JSON.parse(data);
        //
        const noteID = req.params.id
        console.log(noteID)
        console.log(typeof noteID)
        for (let i = 0; i < noteList.length; i++) {
            console.log('for loop')
            console.log(noteList[i].id)
            if (noteList[i].id == noteID) {
                console.log(i)
                console.log("spliced the id and removed from list")
                //splice needs to be 1, so it removed a single item from array
                noteList.splice(i, 1)
                console.log(noteList)
            }
        }
        console.log("Outside of loop")
        console.log(noteList)
        //trying to write file
        fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) =>
            err ? console.error(err) : console.log('Written file!'))
        res.json(noteList);

    })
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);

});
