const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        max: 255
    },
    author: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: false,
        max: 10000
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 10000
    },
    currency: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    pages: {
        type: Number,
        required: false,
        min: 1,
        max: 10000
    },
    review: {
        type: String,
        required: false,
        min: 1,
        max: 10000
    }
});

module.exports = mongoose.model('Book', bookSchema)