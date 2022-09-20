const router = require('express').Router();

router.get('/',(req, res) => {
    // #swagger.path = '/api/health'
    // #swagger.tags = ['Health']
    // #swagger.summary = 'Health check'
    // #swagger.description = 'An endpoint to check if the app is ready and running.'
    res.status(200).send('OK');
})

module.exports = router;