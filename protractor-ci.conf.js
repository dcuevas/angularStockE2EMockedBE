const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  directConnect: true,
  chromeOptions: {
    args: ['--no-sandbox', "--headless", "--window-size=800x600"]
  }
};

exports.config = config;
