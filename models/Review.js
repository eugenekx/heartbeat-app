const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    song: {
        type: Schema.Types.ObjectId,
        ref: 'song',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    text: {
        type: String,
        required: true,
        default: ''
    },
    rating: {
        type: Boolean,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: date,
        required: true,
        default: Date.now()
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);