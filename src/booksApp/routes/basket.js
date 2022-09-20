const Basket = require('../models/Basket')
const {addBookToBasketValidation} = require("../utils/validation");
const router = require('express').Router();
const { trafficLimiter } = require('../../../utils/trafficLimiter')

router.get('/', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/booksApp/basket'
    // #swagger.tags = ['Books App']
    // #swagger.summary = 'Get your basket'
    // #swagger.description = 'An endpoint that allows you to get the contents of your basket.'

    const sessionID = req.cookies.sessionID
    const userID = req.cookies.userID

    const basketQuery = (userID) ? {'userID': userID} : {'sessionID': sessionID};
    const objConfig = {'sessionID': 1, 'userID': 1, 'bookIDs': 1, '_id': 1}

    let basket;

    try {
         basket = await Basket.findOne(basketQuery).select(objConfig)
    } catch (err) {
        return res.status(400).send(err)
    }

    if (basket)
    {
        res.status(200).send(basket)
    } else {
        res.status(200).send('{}')
    }
})

router.post('/', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/booksApp/basket'
    // #swagger.tags = ['Books App']
    // #swagger.summary = 'Add a book to your basket'
    // #swagger.description = 'An endpoint that allows you to add a book to your basket using the book's id.'
    /*  #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            id: 'string',
            }
    } */

    const { error } = addBookToBasketValidation(req.body);
    if (error) return res.send(400).send(error.details[0].message)

    const bookID = req.body.id
    const sessionID = req.cookies.sessionID
    const userID = req.cookies.userID

    const basketQuery = (userID) ? {'userID': userID} : {'sessionID': sessionID};

    let basketExists

    try {
        basketExists = await Basket.findOne(basketQuery)
    } catch (err) {
        return req.status(400).send(err)
    }

    if(basketExists) {
        try {
            await Basket.updateOne(
                basketQuery,
                {$addToSet: {bookIDs: bookID}},
            )
            return res.status(200).send('Book added to basket.')
        } catch (err) {
            return res.status(400).send(err)
        }
    } else {
        basket = new Basket({
            sessionID: sessionID,
            bookIDs: [bookID],
        })

        try {
            basket.save();
            res.status(200).send('Book added to basket.');
        } catch (err) {
            res.status(400).send(err);
        }
    }
})

router.get('/reset', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/booksApp/basket/reset'
    // #swagger.tags = ['Books App']
    // #swagger.summary = 'Reset your all baskets'
    // #swagger.description = 'An endpoint that allows you to remove all baskets from the database.'

    try {
        await Basket.deleteMany()
        res.status(200).send()
    } catch (err) {
        return res.status(400).send(err);
    }
})

module.exports = router;