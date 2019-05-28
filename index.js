const Rollbar = require("rollbar");

const defaultOptions = {
  verbose: true,
  captureUncaught: true,
  captureUnhandledRejections: true
};

module.exports = options => {
  const combinedOptions = {
    ...defaultOptions,
    ...options
  };

  const rollbar = new Rollbar({
    ...combinedOptions,
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN
  });

  return (err, req, res, next) => {
    rollbar.error(err);
    next(err);
  };
};
