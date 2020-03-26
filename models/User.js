const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
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
                return text.indexOf('https://www.bandcamp.com/') === 0;
            },
            message: 'Bandcamp must start with https://www.bandcamp.com/'
        }
    },
    spotifyLink: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://www.spotify.com/') === 0;
            },
            message: 'Spotify must start with https://www.spotify.com/'
        }
    },
    facebookLink: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://www.facebook.com/') === 0;
            },
            message: 'Facebook must start with https://www.facebook.com/'
        }
    },
    twitterLink: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://www.twitter.com/') === 0;
            },
            message: 'Twitter must start with https://www.twitter.com/'
        }
    }
});

module.exports = User = mongoose.model('user', UserSchema);