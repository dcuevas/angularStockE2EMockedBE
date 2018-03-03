const express = require('express');
const ngApimock = require('ng-apimock')();
const app = express();

/**
 * Register all available mocks and generate interface
 */
ngApimock.run({
  "src": "mocks",
  "outputDir": ".tmp/ngApimock",
  "done": function() {}
});

app.set('port', (process.env.PORT || 49152));
// process the api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);
// serve the mocking interface for local development
app.use('/mocking', express.static('.tmp/ngApimock'));

app.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
});

