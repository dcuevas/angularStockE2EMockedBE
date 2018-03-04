const fs = require('fs');
const mkdirp = require('mkdirp');
const reporter = require('cucumber-html-reporter');
const htmlReports = process.cwd() + '/reports/html';
const targetJson = process.cwd() + '/reports-metadata/e2e/report.cucumber';

const cucumberReporteroptions = {
  theme: 'bootstrap',
  jsonFile: targetJson,
  output: htmlReports + '/cucumber_reporter.html',
  reportSuiteAsScenarios: true
};

class Reporter {
  static createDirectory(dirName) {
    // Check if the directory exist
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
  }

  /**
   * Create an html report output
   */
  static createHTMLReport() {
    try {
      reporter.generate(cucumberReporteroptions); //invoke cucumber-html-reporter
    } catch (err) {
      if (err) {
        console.log('Failed to save cucumber test results to json file.');
        console.log(err);
      }
    }
  }

}

module.exports = Reporter;
