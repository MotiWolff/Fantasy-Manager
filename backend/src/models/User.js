const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    yahooId: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: String,
    refreshToken: String,
    teamId: String,
    preferences: {
        autoUpdate: {
            type: Boolean,
            default: true
        },
        updateWindow: {
            start: String,
            end: String
        },
        notifications: {
            email: Boolean,
            push: Boolean
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema); 