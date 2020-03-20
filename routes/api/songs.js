const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// Song Model
const Song = require('../../models/Song');

// @route   GET api/songs
// @desc    Get Song By ID
// @access  Private
router.get('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(song => res.json(song))
});

// @route   POST api/songs
// @desc    Create Song
// @access  Private
router.post('/', auth, (req, res) => {
    const newSong = new Song({
        name: req.body.name,
        artistName: req.body.artistName,
        filename: req.body.filename,
        artwork: req.body.artwork,
    });

    newSong.save()
        .then(song => res.json(song));
});

// @route   DELETE api/songs
// @desc    Delete Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Song.findById(req.params.id)
    .then(song => song.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})


module.exports = router;