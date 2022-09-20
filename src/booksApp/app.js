const router = require('express').Router();
const auth = require('./routes/auth')
const user = require('./routes/user')
const settings = require('./routes/settings')
const books = require('./routes/books')
const basket = require('./routes/basket')
const orders = require('./routes/orders')

router.use('/', auth)
router.use('/user', user)
router.use('/settings', settings)
router.use('/books', books)
router.use('/basket', basket)
router.use('/orders', orders)

module.exports = router;