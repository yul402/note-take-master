// Dependencies
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fsUtils = require('../helpers/fsUtils');

// GET request
router.get('/notes', function (req, res) {
    fsUtils.readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST request
router.post('/notes', (req, res) => {
    // fsUtils
    //     .addNote(req.body)
    //     .then((note) => res.json(note))
    //     .catch(err => res.status(500).json(err));
    const {title,text} = req.body;

    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
        const newNote = {
        title,
        text,
        id: uuidv4(),
        }

        fsUtils.readAndAppend(newNote, 'db/db.json');

        const response = {
        status: 'success',
        body: newNote,
        };

        res.json(response);
    }else {
    res.json('Error in posting feedback');
  }
});

// Bonus - DELETE request
router.delete('/notes/:id', function (req, res) {
    fsUtils.deleteFromFile('db/db.json',req.params.id,)
    fsUtils.readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))

    // fsUtils
    //     .deleteNote(req.params.id)
    //     .then(() => res.json({ ok: true }))
    //     .catch(err => res.status(500).json(err));
});


module.exports = router;