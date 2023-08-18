const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetcher");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: get all the notes using : Get "/api/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
} catch (error) {
  console.error(error.message);
  res.status(400).send("Internal server error occurred");
}
});

// Route 2: add notes using : Post "/api/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const {title, description,tag } = req.body;
      // If there are errors, return a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    
    // check weather title already exists.
    let titleExist = await Note.findOne({ title: title });
    if (titleExist) {
      return res.status(400).json({ errors: "title already exists" });
    }
    const saveNote = await note.save()
    res.json(saveNote)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
  }
);

// Route 3: update note using : Put "/api/updatenote" Login required
router.put("/updatenote/:id",fetchuser,async (req, res) => {
    try {
      const {title, description,tag } = req.body;
      // create a newNote object;
      const newNote ={};
      if (title) {newNote.title = title;}
      if (description) {newNote.description = description;}
      if (tag) {newNote.tag = tag;}

      // Find the note to be updated
      let note = await Note.findById(req.params.id);
      if (!note) {return res.status(401).send("Note not found");}
      if (note.user.toString() !== req.user.id) {
       return res.status(401).send("Not Allowed ");
      }
      note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
      res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
  }
);

// Route 4: Delete note using : Delete "/api/deletenote" Login required
router.delete("/deletenote/:id",fetchuser,async (req, res) => {
    try {
      // Find the note to be Delete
      let note = await Note.findById(req.params.id);
      if (!note) {return res.status(401).send("Note not found");}  // checking if note if found
      if (note.user.toString() !== req.user.id) {  // validating user
       return res.status(401).send("Not Allowed ");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json("Note deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
  }
);

module.exports = router;
