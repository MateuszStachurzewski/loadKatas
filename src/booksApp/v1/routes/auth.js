const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validation');
const Basket = require("../models/Basket");
const {trafficLimiter} = require("../../../../utils/trafficLimiter");

router.post('/register', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/v1/booksApp/register'
    // #swagger.tags = ['Books App v1']
    // #swagger.summary = 'Create a user'
    // #swagger.description = 'An endpoint that allows you to create a user with username and password.'
    /*  #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            name: 'string',
            email: 'string',
            password: 'string',
            language: 'string',
            country: 'string',
            currency: 'string'
        }
    } */

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let emailExists;

    try {
        emailExists = await User.findOne({email: req.body.email})
    } catch (err) {
        res.status(400).send(err)
    }

    if(emailExists) return res.status(400).send('Email already exists');

    let nameExists;

    try {
        nameExists = await User.findOne({name: req.body.name})
    } catch (err) {
        res.status(400).send(err)
    }

    if(nameExists) return res.status(400).send('Name already exists');


    const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
       language: req.body.language,
       country: req.body.country,
       currency: req.body.currency
    });

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err);
    }
})

const findSessionBasedBasket = (sessionID) => {
    return Basket.findOne({sessionID: sessionID})
}

const findUserBasedBasket = (userID) => {
    return Basket.findOne({userID: userID})
}

const mergeCurrentBasketWithExisting = async (userID, sessionID, books) => {
    // Merge books from the current session basket
    await Basket.updateOne(
        {userID: userID},
        {$addToSet: {bookIDs: {"$each": books}}}
    )

     // Remove the current session basket
    await Basket.deleteOne({sessionID: sessionID})
};

const updateUserBasket = (userID, sessionID) => {
    Basket.findOneAndUpdate(
        {userID: userID},
        {"$set": {sessionID: sessionID}})
    };

const updateSessionBasket = async(sessionID, userID) => {
    await Basket.updateOne(
        {sessionID: sessionID},
        {userID: userID},
    )
};

router.post('/login', trafficLimiter, async (req, res) => {
    // #swagger.path = '/api/v1/booksApp/login'
    // #swagger.tags = ['Books App v1']
    // #swagger.summary = 'Login'
    // #swagger.description = 'An endpoint that allows you to login with username and password.'
    /*  #swagger.parameters['obj'] = {
        in: 'body',
        schema: {
            email: 'string',
            password: 'string'
            }
    } */

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPassword = (req.body.password === user.password);
    if(!validPassword) return res.status(400).send('Email or password is wrong')

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, 'token_secret_1234');

    const sessionID = req.cookies.sessionID

    // Check which baskets exist
    const sessionBasedBasket = await findSessionBasedBasket(sessionID);
    const userBasedBasket = await findUserBasedBasket(user._id);

    if (userBasedBasket) {
        try {
           await updateUserBasket(user._id, sessionID)
        } catch (err) {
            return res.status(400).send(err)
        }
        if (sessionBasedBasket) {
            try {
                await mergeCurrentBasketWithExisting(user._id, sessionID, sessionBasedBasket.bookIDs)
            } catch (err) {
                return res.status(400).send(err)
            }
        }
    }
    if (sessionBasedBasket) {
        try {
            await updateSessionBasket(sessionID, user._id)
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    res.cookie("userID", user._id)
    res.header('auth-token', token)
    res.send({auth_token: token})
})

module.exports = router;