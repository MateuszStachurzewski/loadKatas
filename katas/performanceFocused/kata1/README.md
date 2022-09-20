## Name: Find your limits Kata

### App: booksApp

### Description

You're a part of a product company that is currently preparing a new solution. You're working on an MVP.
Obviously the business team made some research and predictions on the possible traffic after the 
first release, but they take into account that the market may surprise them and the traffic will be higher than expected.

The expected traffic is estimated to be 10000 users per hour.

### Task
The development team picked the resource configuration for the production instance of the application, 
having in mind reasonable costs, the predicted traffic and some common good practices.

To anticipate possible issues, it is necessary to test against this predicted traffic, but also, figure out
how big of a buffer the instance has in case the prediction is missed.

Thanks to the results of your investigation, the development team will be able to set some alarming 
tresholds and react to the underestimated load early enough.

However, remember that each user journey may look differently. Some users will go full journey, 
some will cancel in the middle and others will loop first few steps several times before they
finalize the journey. 

### Success Criteria
- you verified that the load - 10000 users per hour - can be handled by the production instance
- you defined the buffer - how many users/hour more can the app handle before the latency is unbearable 
and errors start to arrive
- you produced a recommendation how to set monitoring tresholds