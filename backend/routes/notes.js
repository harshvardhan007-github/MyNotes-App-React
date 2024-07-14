const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

const fetchuser = require('../middleware/fetchUser');

// Route 1: Fetch all notes: GET "/api/notes/". require Auth
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        console.log("hello");
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }

})


// Route 2: Add a note: POST "/api/notes/addnote". require Auth
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {

    try {

        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.send({ errors: err.array() });
        }

        // creating a note
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // saving note in database
        const saveNote = await note.save()
        res.json(saveNote);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }


})

// Route 3: Update existing note note: POST "/api/notes/updatenote". require Auth
// put preferred for updating elements | :id is the _id of node
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    
    try {
        const { title, description, tag } = req.body;

        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        
        // Find the note to be updated and check if the note id is valid
        let note = await Notes.findById(req.params.id); // req.param.id -> :id mentioned above in the path | let bcz yiu'll update it later
        if (!note) { return res.send("Not Found") }
       
        // checking if the user is trying to access it's own note only. By comparing user id
        if (note.user.toString() !== req.user.id) {
            return res.send("Not allowed");
        }
        
        // function for updating an entry, (note_to_update, updated_values, new?)
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note);
        console.log("hello");

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})

// Route 4: Delete Note: "/api/notes/deletenote". require Auth
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find the note to be updated and check if the note id is valid
        let note = await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("Please use a valid token") }

        // checking if the user is trying to access it's own note only. By comparing user id
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id); // note will contain the deleted note
        res.send({"Success": "Note Deleted Successfully", "note": note});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }

})

module.exports = router
