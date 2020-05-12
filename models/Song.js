const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SongSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'genre',
        required: true,
    },
    reviewPoints: {
        type: Number,
        required: true,
        default: 0
    },
    artistName: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    artwork: {
        type: String,
        required: true,
    },
    waveform: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = Song = mongoose.model('song', SongSchema);