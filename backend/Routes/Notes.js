const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} = require("../Controller/NoteController");

const router = require("express").Router();

// CREATE NOTE
router.post("/newnote/:email", createNote);

//GET NOTES
router.get("/my-notes/:email", getNotes);

// DELETE NOTE

router.delete("/:id", deleteNote);

//UPDATE NOTE
router.put("/:id", updateNote);

module.exports = router;
