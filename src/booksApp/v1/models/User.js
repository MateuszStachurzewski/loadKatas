const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    country: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    currency: {
        type: String,
        required: true,
        min: 1,
        max: 100
    }
});

module.exports = mongoose.model('User', userSchema)