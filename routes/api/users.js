const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

var secret;
if (process.env.NODE_ENV === "production") {
	secret = process.env.secretJWT;
} else {
	secret = require("../../config/keys").secretJWT;
}

// Song Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post("/", (req, res) => {
	const {
		name,
		email,
		password,
		bandcampLink,
		spotifyLink,
		facebookLink,
		twitterLink,
	} = req.body;

	// Simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}
	const avatar = "";
	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ msg: "User already exists" });

		const newUser = new User({
			name,
			avatar,
			email,
			password,
			bandcampLink,
			spotifyLink,
			facebookLink,
			twitterLink,
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
					jwt.sign(
						{ id: user.id },
						secret,
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user,
							});
						}
					);
				});
			});
		});
	});
});

// @route   GET api/users
// @desc    Get User By ID
// @access  Private
router.get("/:id", auth, (req, res) => {
	User.findById(req.params.id).then((user) => res.json(user));
});

// @route   POST api/users/update
// @desc    Update User By ID
// @access  Private
router.post("/update/", auth, (req, res) => {
	// if user doesn't exist
	User.exists({ _id: req.user.id }).then((exists) => {
		if (!exists) {
			return res.status(400).json({ msg: "User does not exist." });
		}
	});

	User.findByIdAndUpdate(req.user.id, req.body.updatedUser, { new: true })
		.select("-password")
		.then((updUser) => res.json(updUser));
});

module.exports = router;
