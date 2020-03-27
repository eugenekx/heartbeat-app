const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Models
const Review = require('../../models/Review');
const User = require('../../models/User');
const Song = require('../../models/Song');

// @route   GET api/reviews
// @desc    Get Review By ID
// @access  Private
router.get('/:id', auth, (req, res) => {
    Review.findById(req.params.id)
        .then(review => res.json(review))
});

// @route   GET api/reviews/song
// @desc    Get Review List For Song
// @access  Private
router.get('/song/:id', auth, (req, res) => {
    Review.find({ song: req.params.id })
        .then(reviews => res.json(reviews));
})

// @route   GET api/reviews/unread/user
// @desc    Get Unread Review List For User
// @access  Private
router.get('/unread/', auth, (req, res) => {
    Review.find({ user: req.user.id, isRead: false })
        .then(reviews => res.json(reviews));
})

// @route   GET api/reviews/history
// @desc    Get Review History List For User
// @access  Private
router.get('/history/', auth, (req, res) => {
    Review.find({ user: req.user.id }).sort('-date').populate('song')
        .then(reviews => res.json(reviews));
})

// @route   GET api/reviews/favorite
// @desc    Get Review Favorite List For User
// @access  Private
router.get('/favorite/', auth, (req, res) => {
    Review.find({ user: req.user.id, rating: true}).sort('-date').populate('song')
        .then(reviews => res.json(reviews));
})

// @route   POST api/reviews/
// @desc    Post Review
// @access  Private
router.post('/', auth, (req, res) => {
    const {
        song,
        user,
        text,
        rating
    } = req.body;

    if(user === req.user.id) {
        return res.status(400).json({ msg: "Can't review your own song."});
    }

    if(!song || !user || !rating) {
        return res.status(400).json({ msg: "Please enter all fields."});
    }

    const newReview = new Review({
        song,
        user,
        text,
        rating
    });

    newReview.save()
        .then(review => {
            User.findByIdAndUpdate(user, { $inc: { points: 1 } }, {new: true})
                .then( (newUser) => console.log('New user balance: ' + newUser.points));
            Song.findByIdAndUpdate(song, { $inc: { reviewPoints: -1 } }, {new: true})
                .then( (newSong) => console.log('New song balance: ' + newSong.points));
            res.json(review);
        });
})

module.exports = router;