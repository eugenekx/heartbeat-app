const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Song Model
const User = require('../../models/User');

var secret;
if (process.env.NODE_ENV === 'production') {
    secret = process.env.secretJWT;
} else {
    secret = require('../../config/keys').secretJWT;
}
// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' });

            // Validate password
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                jwt.sign(
                    { id: user.id },
                    secret,
                    { expiresIn:3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user
                        });
                    }
                )
            })
        })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            //console.log(user);
            res.json(user);
        });
});

module.exports = router;