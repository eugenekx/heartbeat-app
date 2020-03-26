const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Song Model
const Song = require('../../models/Song');

// @route   GET api/songs
// @desc    Get Song By ID
// @access  Private
router.get('/:id', auth, (req, res) => {
    Song.findById(req.params.id)
        .then(song => res.json(song))
});

// @route   GET api/songs/user
// @desc    Get Song By ID
// @access  Private
router.get('/user/:id', auth, (req, res) => {
    Song.find({ user: req.params.id })
        .then( result => res.json(result));
});

// @route   GET api/songs/review
// @desc    Get Song For Review
// @access  Private
router.get('/review/:genre_id', auth, (req, res) => {
    // query: GET ONE RANDOM WHERE genre id = song genre AND song.reviewPoints > 0

    Song.countDocuments({ genre: req.params.genre_id, reviewPoints: {$gt : 0}})
        .then(count => {
            var random = Math.floor(Math.random() * count);

            Song.findOne({ genre: req.params.genre_id, reviewPoints: {$gt : 0}}).skip(random).populate('user', '-password')
            .then( result => res.json(result));
        });
});
 
// @route   POST api/songs
// @desc    Create Song
// @access  Private
router.post('/', auth, (req, res) => {
    const newSong = new Song({
        user: req.body.user,
        name: req.body.name,
        genre: req.body.genre,
        artistName: req.body.artistName,
        filename: req.body.filename,
        artwork: req.body.artwork,
        waveform: req.body.waveform
    });

    newSong.save()
        .then(song => res.json(song));
});

// @route   POST api/songs/update
// @desc    Update Song By ID
// @access  Private
router.post('/update/:id', auth, (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body.updatedSong, {new: true})
        .then(updSong => res.json(updSong));
});

module.exports = router;