let noOfRequests = 0;

setInterval(function() {
    noOfRequests = 0;
}, 1000)

const trafficRecorder = (req, res, next) => {
    noOfRequests++;

    console.log(`No of requests/s: ${Math.floor(noOfRequests)}`)
    next()
}

module.exports = {
    getNoOfRequests: () => noOfRequests,
    trafficRecorder: trafficRecorder
}

