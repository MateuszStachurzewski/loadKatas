const jwt = require("jsonwebtoken");
const router = require('express').Router();
const User = require('../models/User');
const verify = require('../utils/verifyToken')
const { trafficLimiter } = require('../../../../utils/trafficLimiter')

router.get('/', [verify, trafficLimiter], async (req, res) => {
    // #swagger.path = '/api/v1/booksApp/user'
    // #swagger.tags = ['Books App v1']
    // #swagger.summary = 'Get user's info'
    // #swagger.description = 'An endpoint that allows you to get user's info like name, email and date of creation'

    const userId = req.cookies.userID

    if(!userId) return res.status(400).send('Invalid token');

    try {
        const userData = await User.findOne({_id: userId});
        res.send({
            "name": userData.name,
            "email": userData.email,
            "date": userData.date
        });
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;