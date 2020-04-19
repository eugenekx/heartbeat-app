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
        validate: {
            validator: function(text) {
                if (text === '') {
                    return true;
                }
                return text.indexOf('https://www.bandcamp.com/') === 0;
            },
            message: 'Bandcamp must start with https://www.bandcamp.com/'
        },
        default: ''
    },
    spotifyLink: {
        type: String,
        validate: {
            validator: function(text) {
                if (text === '') {
                    return true;
                }
                return text.indexOf('https://www.spotify.com/') === 0;
            },
            message: 'Spotify must start with https://www.spotify.com/'
        },
        default: ''
    },
    facebookLink: {
        type: String,
        validate: {
            validator: function(text) {
                if (text === '') {
                    return true;
                }
                return text.indexOf('https://www.facebook.com/') === 0;
            },
            message: 'Facebook must start with https://www.facebook.com/'
        },
        default: ''
    },
    twitterLink: {
        type: String,
        validate: {
            validator: function(text) {
                if (text === '') {
                    return true;
                }
                return text.indexOf('https://www.twitter.com/') === 0;
            },
            message: 'Twitter must start with https://www.twitter.com/'
        },
        default: ''
    }
});

module.exports = User = mongoose.model('user', UserSchema);