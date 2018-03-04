// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const child_process = require('child_process');
const jsonReports = process.cwd() + '/reports/json';
const Reporter = require('./e2e/support/reporter');

const server = child_process.spawn('node', ['server.js']);

server.stdout.pipe(process.stdout);

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './e2e/**/*.e2e-spec.ts' // For jasmine e2e
    './e2e/features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  // framework: 'jasmine', // For jasmine e2e
  framework: 'custom',

  // Cucumber extra
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./e2e/steps/**/*.ts'],
    tags: [],
    strict: true,
    format: [
      'progress-bar',
      'json:./reports/json/cucumber_report.json'
      //'usage-json',
      // 'pretty:reports/summary.txt',
      // 'json:reports/summary.json'
    ],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    compiler: [],
  },
  // jasmineNodeOpts: {
  //   showColors: true,
  //   defaultTimeoutInterval: 30000,
  //   print: function() {}
  // },
  ngApimockOpts: {
    angularVersion: 5,  // {number} provide major version of Angular
    hybrid: false // optional boolean which can be used for testing Angular apps within an AngularJs app.
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.ngApimock = require('./.tmp/ngApimock/protractor.mock.js');

    Reporter.createDirectory(jsonReports);
    // jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  onComplete: function() {
    Reporter.createHTMLReport();
  },
};

process.on('exit', () => server.kill());
