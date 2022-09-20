const Book = require("../models/Book");
const {searchBookValidation} = require("../utils/validation");
const router = require('express').Router();
const { get } = require('../../../utils/trafficRecorder')
const { trafficLimiter } = require('../../../utils/trafficLimiter')

router.get('/', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/booksApp/books'
    // #swagger.tags = ['Books App']
    // #swagger.summary = 'Get all books.'
    // #swagger.description = 'An endpoint that allows you to get all books stored by the database.'

    const objConfig = { _id: 0, name: 1, author: 1, description: 1}

    try {
        const books = await Book.find({}).select(objConfig)
        res.status(200).send(books)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/:id', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/booksApp/books/:id'
    // #swagger.tags = ['Books App']
    // #swagger.summary = 'Get the details of the book.'
    // #swagger.description = 'An endpoint that allows you to get details of a particular book'

    const id = req.params.id
    const objConfig = { _id: 1, name: 1, author: 1, description: 1, price: 1, currency: 1, pages: 1, review: 1  }

    try {
        const bookDetails = await Book.findOne({_id: id}).select(objConfig)
        if (bookDetails.length === 0) {return res.status(400).send('The book doesn\'t exist.')}
        res.status(200).send(bookDetails)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/booksApp/books'
    // #swagger.tags = ['Books App']
    // #swagger.summary = 'Search for a particular book'
    // #swagger.description = 'An endpoint that allows you to search for a particular book using the book's name.'
    /*  #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            name: 'string',
            }
    } */

    const { error } = searchBookValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const name = req.body.name;

    const objConfig = { _id: 1, name: 1, author: 1, description: 1, price: 1 }

    try {
        const book = await Book.findOne({name: name}).select(objConfig)
        if (book.length === 0) {return res.status(400).send('The book was not found.')}
        res.status(200).send(book)
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router;