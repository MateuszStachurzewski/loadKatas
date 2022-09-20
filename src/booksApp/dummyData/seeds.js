const Book = require("../models/Book");
const fs = require('fs');
const path = require("path");

const seedDB = async () => {
    await fs.readFile(path.resolve(__dirname, "./books.json"), 'utf8', async (err, data) => {
        if(err) throw new Error(err)
        const booksData = JSON.parse(data);
        try {
            await Book.insertMany(booksData)
        } catch (err) {
            if (err.code !== 11000) throw err
        }
    })
};

module.exports.seedDB = seedDB;
