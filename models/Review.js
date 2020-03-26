const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    song: {
        type: Schema.Types.ObjectId,
        ref: 'song',
        required: true,
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
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);