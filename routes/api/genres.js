const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Genre Model
const Genre = require('../../models/Genre');

// @route   GET api/genres
// @desc    Get Genres List
// @access  Private
router.get('/', auth, (req, res) => {
    Genre.find({})
        .then(genres => res.json(genres));
});

router.post('/', auth, (req, res) => {
    const newGenre = new Genre({
        text : req.body.text
    });

    newGenre.save()
        .then(genre => res.json(genre));
});

module.exports = router;