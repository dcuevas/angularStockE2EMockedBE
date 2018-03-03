const express = require('express');
const connect = require('connect');
const ngApimock = require('ng-apimock')();
const app = connect();
const http = require('http');

/**
 * Register all available mocks and generate interface
 */
ngApimock.run({
  "src": "mocks",
  "outputDir": ".tmp/ngApimock",
  "done": function() {}
});

// app.set('port', (process.env.PORT || 3000));
// process the api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);
app.use(function middleware2(req, res, next) {
  // middleware 2
  next();
});
// serve the mocking interface for local development
app.use('/mocking', express.static('.tmp/ngApimock'));


// This conf is for express
//app.listen(app.get('port'), function() {
  //console.log('app running on port', app.get('port'));
//});

// This for connect
http.createServer(app).listen(3000);

