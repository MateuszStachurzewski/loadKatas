const express = require('express');
const health = require('./src/health')
const booksAppV1 = require('./src/booksApp/v1/app')

const { seedDB } = require('./src/booksApp/v1/dummyData/seeds')
const { trafficRecorder } = require('./utils/trafficRecorder')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const rateLimit = require('express-rate-limit')

const app = express();

// Throttling
const limitOptions = {
    windowMs: 1000,
    max: 15,
    handler: function(req, res, next) {
        setTimeout(function() {
            return res.status(429).json({
                error: 'You sent too many requests. Please wait a while then try again'
            })
        }, 30000)
    }
}
app.use(rateLimit(limitOptions))

// setup db and seed data
mongoose.connect('mongodb://0.0.0.0:27017',
    { useNewUrlParser: true},
    () => {console.log('connected to db!')
    try {
        seedDB().then(() => {
            console.log('Seeded DB with books data')
        })
    } catch (err) {
        console.log(err)
    }
});

// Helpers
app.use(express.json());
app.use(cookieParser());
app.use(trafficRecorder)

// Set session cookie
app.use(session({
    name: 'sessionID',
    secret: 'token_secret_1234',
    cookie: {maxAge: 3000000},
    saveUninitialized: true
}));

// Routes
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/api/health', health)
app.use('/api/v1/booksApp', booksAppV1)

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})