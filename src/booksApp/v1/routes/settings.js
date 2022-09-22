const router = require('express').Router();
const verify = require('../utils/verifyToken')
const User = require("../models/User");
const { trafficLimiter } = require('../../../../utils/trafficLimiter')

router.get('/', [verify, trafficLimiter], async (req, res) => {
    // #swagger.path = '/api/v1/booksApp/settings'
    // #swagger.tags = ['Books App v1']
    // #swagger.summary = 'Get user settings'
    // #swagger.description = 'An endpoint that allows you to get user's settings like language, country and currency'

    const userId = req.cookies.userID

    if(!userId) return res.status(400).send('Invalid token');

    try {
        const userData = await User.findOne({_id: userId});
        res.send({
            "language": userData.language,
            "country": userData.country,
            "currency": userData.currency
        });
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;