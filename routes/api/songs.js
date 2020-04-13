const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Song Model
const Song = require('../../models/Song');
const User = require('../../models/User');


// @route   GET api/songs/id
// @desc    Get Song By ID
// @access  Private
router.get('/id/:id', auth, (req, res) => {
    Song.findById(req.params.id).populate('genre')
        .then(song => res.json(song))
});

// @route   GET api/songs/user
// @desc    Get Song List For User
// @access  Private
router.get('/user', auth, (req, res) => {
    Song.find({ user: req.user.id }).populate('genre')
        .then( result => res.json(result));
});

// @route   GET api/songs/review
// @desc    Get Song For Review
// @access  Private
router.get('/review/:genre_id', auth, (req, res) => {
    // query: GET ONE RANDOM WHERE genre id = song genre AND song.reviewPoints > 0 AND not current user
    // TODO: AND NOT REVIEWED BY USER YET (DONE)
    Review.find({ user: req.user.id })
        .then(result => {
            let reviewedSongs = result.map(item => item.song);
            
            Song.countDocuments({ _id: { $nin : reviewedSongs }, genre: req.params.genre_id, reviewPoints: {$gt : 0}, user: { $ne : req.user.id }})
                .then(count => {
                    var random = Math.floor(Math.random() * count);

                    Song.findOne({ _id: { $nin : reviewedSongs }, genre: req.params.genre_id, reviewPoints: {$gt : 0}, user: { $ne : req.user.id }}).skip(random).populate('user', '-password')
                        .then( result => {
                            if (!result) {
                                res.json({ msg: 'no songs'});
                            } else {
                                res.json(result);
                            }
                        });
                });
        })

    
});
 
// @route   POST api/songs
// @desc    Create Song
// @access  Private
router.post('/', auth, (req, res) => {
    const newSong = new Song({
        user: req.user.id,
        name: req.body.name,
        genre: req.body.genre,
        artistName: req.body.artistName,
        filename: req.body.filename,
        artwork: req.body.artwork,
        waveform: req.body.waveform,
    });

    newSong.save()
        .then(song => res.json(song));
});

// @route   POST api/songs/update
// @desc    Update Song By ID
// @access  Private
router.post('/update/:id', auth, (req, res) => {
    Song.exists({ _id: req.params.id })
        .then(exists => {
            if (!exists) {
                return res.status(400).json({ msg: 'Song does not exist.' });
            }
        })

    Song.findByIdAndUpdate(req.params.id, req.body.updatedSong, {new: true})
        .then(updSong => res.json(updSong));
});


// @route   POST api/songs/addpoint
// @desc    Add Point From User To Song
// @access  Private
router.post('/addpoint/:id', auth, (req, res) => {
    Song.findById(req.params.id)
        .then(song => {
            if (song.user !== req.user.id) {
                return res.status(403).json({ msg: "Can't transfer points to another user's song"});
            }

            User.findByIdAndUpdate(user, { $inc: { points: -1 } }, {new: true})
                .then( (newUser) => console.log('New user balance: ' + newUser.points));
            song.reviewPoints.$inc();
            song.save()
                .then( () => console.log('New song balance: ' + song.points));
        })
})


module.exports = router;