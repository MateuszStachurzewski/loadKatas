const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './src/health.js',
    './src/booksApp/routes/auth.js',
    './src/booksApp/routes/basket.js',
    './src/booksApp/routes/books.js',
    './src/booksApp/routes/orders.js',
    './src/booksApp/routes/settings.js',
    './src/booksApp/routes/user.js'
]

const doc = {
  info: {
    title: 'Load Katas App',
    description: 'An app for practicing performance testing',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})