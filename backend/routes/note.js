const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route for fetching the notes
router.get("/getallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route for adding new notes
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please Enter a valid length of title").isLength({ min: 3 }),
    body("description", "Please Enter a valid length of description").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //Respond on Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      // In req we have send user:{id:user.id} not in body we have send anything thats why we are using req.user.id

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route for updating notes
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("File not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized access");
    }

    //set is used to set the updated notes and new:true means if any new content is arrived it will create automatically

    //req.params.id contains notes id so it is much effective
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route for deleting notes
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be updated and deleted it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("File not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized access");
    }

    //req.params.id contains notes id so it is much effective
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Message deleted successfully", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
