const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema(({
    userID: {
        type: String,
        unique: true,
        sparse: true,
        required: false,
    },
    sessionID: {
        type: String,
        unique: true,
        required: true,
    },
    bookIDs: {
        type: Array
    }
}))

module.exports = mongoose.model('Basket', basketSchema)