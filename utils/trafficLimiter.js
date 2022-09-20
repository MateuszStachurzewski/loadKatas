const { getNoOfRequests } = require('./trafficRecorder')

const trafficLimiter = (req, res, next) => {
    const noOfRequests = getNoOfRequests()
    let latency;

    if (noOfRequests < 5) {
        latency = 200;
    } else if (noOfRequests < 10) {
        latency = 500;
    } else if (noOfRequests < 15) {
        latency = 1500;
    } else if (noOfRequests < 25) {
        latency = 3000;
    }

    console.log(`Applied latency: ${latency} on ${req.method} ${req.originalUrl}`)
    setTimeout(next, latency)
}

module.exports.trafficLimiter = trafficLimiter;



