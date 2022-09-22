const Basket = require("../models/Basket");
const {orderSubmitValidation} = require("../utils/validation");
const router = require('express').Router();
const { trafficLimiter } = require('../../../../utils/trafficLimiter')

router.post('/', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/v1/booksApp/orders'
    // #swagger.tags = ['Books App v1']
    // #swagger.summary = 'Submit an order'
    // #swagger.description = 'An endpoint that allows you to submit an order, meaning, buy the books that are in the current basket.'
    /*  #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            basketID: 'string',
            }
    } */

    const { error } = orderSubmitValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)


    const basketID = req.body.basketID

    let basket;

    try {
        basket = await Basket.find({_id: basketID})
    } catch (err) {
        return res.status(400).send(err)
    }

    if(basket) {
        try {
            await Basket.deleteOne({_id: basketID})
            res.status(200).send('Order was submitted successfully!')
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(200).send('Basket is empty')
    }
});

module.exports = router;