const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './src/health.js',
    './src/booksApp/v1/routes/auth.js',
    './src/booksApp/v1/routes/basket.js',
    './src/booksApp/v1/routes/books.js',
    './src/booksApp/v1/routes/orders.js',
    './src/booksApp/v1/routes/settings.js',
    './src/booksApp/v1/routes/user.js'
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