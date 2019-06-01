# Loopback Rollbar Logger

[![Build Status](https://travis-ci.com/Danwakeem/loopback-rollbar-logger.svg?branch=master)](https://travis-ci.com/Danwakeem/loopback-rollbar-logger)
[![Coverage Status](https://coveralls.io/repos/github/Danwakeem/loopback-rollbar-logger/badge.svg?branch=master)](https://coveralls.io/github/Danwakeem/loopback-rollbar-logger?branch=master)

This is a simple loopback middleware component to log errored requests to rollbar

## Useage

### Install package

`npm i loopback-rollbar-logger`

### Set up environment for rollbar
You will need to have the `ROLLBAR_ACCESS_TOKEN` key set in your environment so the package knows what rollbar account to log to.

`process.env.ROLLBAR_ACCESS_TOKEN`


### Integrate with loopback

Then in your `middleware.json` file add the following

```json
...
"final:after": {
  "loopback-rollbar-logger": {},
  ...
}
...
```

This will log all errored requests to your rollbar account.

## Rollbar info
This package is based on the [Rollbar.js](https://www.npmjs.com/package/rollbar) package. So if you would like to pass any options on initalization to the Rollbar.js package then you can pass those in to the middleware via the `params` key.

### Eample
```json
...
"final:after": {
  "loopback-rollbar-logger": {
    "params": {
      // Here you can specify Rollbar.js options that will get passed into the constructor
    } 
  },
  ...
}
...
```
