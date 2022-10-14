//importing express
const express = require('express');
//path importing
const path = require('path')
//importing fs to write and read the files
const fs = require('fs')
//importing this from activities to create a unique id for the items
const uuid = require('./helpers/uuid');
const app = express();
const PORT = 3001;

var noteList;
//setting up home page
app.use(express.static('public'))
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'))
// })
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
            console.log(noteList); // Print users 

        })
        // fs.writeFile('./db/db.json', noteList, (err) =>
        //     err ? console.error(err) : console.log('Written file!'))
        //lets write the file


        // noteList.push(newNote)

        // console.log("after making the variable")
        // console.log(noteList)
        // console.log(newNote)
        // noteList.push(newNote)
        //next need to add my new note to the array of previous notes
        //lastly update the db.json file

    }
    // res.json(noteList);
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);

});










      // const rawList = (fs.readFile('./db/db.json', "utf8", (err) =>
        //     err ? console.error(err) : console.log('Read file')))
        // // console.log(rawList)
        // const noteList = JSON.parse(rawList)
        // console.log(noteList)
        // console.log(typeof noteList)
        // // //push new note into the list
        // noteList.push(newNote)
        // console.log(noteList)
        // fs.writeFile("./db/db.json", JSON.stringify(noteList), (err) =>
        //     err ? console.error(err) : console.log('Wrote file!'))