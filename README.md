# Description
This repository contains a Load Katas App. 
Currently the App consists of one API called booksApp. 
However, the goal of this app is to include several different APIs. 
All APIs are prepared with the aim of providing an environment for practicing 
load testing katas.

## Prerequisties
1. Docker https://docs.docker.com/desktop/install/mac-install/
2. Node https://nodejs.org/en/download/
3. Load testing tool: jmeter / k6 / locust
4. Postman [optional]

## How to run

1. Run database
``npm run run-db``

2. Run app
``npm run app``

3. Kill db
``npm run kill-db``

Note: that the database does not persist data when reset.
If you want to clean the db state, just kill the container 
and run it again.

## Katas
Go to `/katas` directory to learn more about katas.

## App
The reasoning behind this API is to run it locally. We want to avoid 
overhead like deployments and any possible cloud limits. By setting the app
locally, you can hit the API as long as you want and with as many threads as 
your machine allows you. 

### Throttling & Latency
In order to simulate a behaviour of an application under load, the app was wrapped with
an artificial latency and throttling.

Latency - the greater the traffic, the greater the latency. There are tresholds that increase 
latency from certain points.

Throttling - the endpoints will handle load successfully only to some point, even if the latency is high. 
However, once this point is achieved, the endpoints will start returning errors.

### Development

4. Run in development mode: ``npm run app-dev``

Note: The development mode runs nodemon which reloads the app everytime you save changes.

## Postman

The postman collection will help you understand the APIs. 
Some requests include scripting in the Postman's `Tests` section where 
some variables are fetched and published as global, for further use in other requests.

You can also use a swagger documentation:

Run swagger: ``npm run swagger-autogen``

Note: The documentation will be available under: http://localhost:3000/doc/#/


## Load testing tools
Since each kata will include solutions in three different tools, there are some utils that may help you
run them.

First, run:
```
cp .env_example .env
```

Note: Remember to modify the .env file with the paths of katas that you're going to solve.
Also, the .env file includes variables that allows you to configure load test runs including paths 
to the test scripts.

### jmeter
you need to have this tool configured locally. If you do, then you can use:
```
npm run _jmeter
```
Using this command will run the script and generate an html report for you.


### k6
again you need to install this by yourself. Once it's installed, you can utilize two commands:
```
npm run run-k6-utils
```
This command will run influxdb and grafana which will allow you to monitor the results of your tests.
```
npm run _k6
``` 
This command will run your tests in k6. It will make k6 send the results of your tests to influxdb. 
Thanks to this, they will be available in grafana. 
In terms of grafana, you will have to import a preconfigured dashboard: https://k6.io/docs/results-visualization/influxdb-+-grafana/#:~:text=edit%20the%20metric%3A-,Preconfigured%20Grafana%20dashboards,-You%20can%20find

### locust
You don't need to install locust, you can use python venv.
```
npm run locust_venv
```
To run the tests, you can use:
```
npm run _locust
```

Note that all of the above commands include a command that loads .env file values.
Given you're .env file is configured properly, you don't have to go anywhere else when running load tests.