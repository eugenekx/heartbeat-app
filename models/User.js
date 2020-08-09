const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    bandcampLink: {
        type: String,
        default: ''
    },
    spotifyLink: {
        type: String,
        default: ''
    },
    facebookLink: {
        type: String,
        default: ''
    },
    twitterLink: {
        type: String,
        default: ''
    }
});

module.exports = User = mongoose.model('user', UserSchema);