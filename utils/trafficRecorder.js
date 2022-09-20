let noOfRequests = 0;

setInterval(function() {
    noOfRequests = Math.floor(noOfRequests * 0.5);
}, 1000)

const trafficRecorder = (req, res, next) => {
    noOfRequests = noOfRequests + 0.55

    console.log(`No of requests/s: ${Math.floor(noOfRequests)}`)
    next()
}

module.exports = {
    getNoOfRequests: () => noOfRequests,
    trafficRecorder: trafficRecorder
}

