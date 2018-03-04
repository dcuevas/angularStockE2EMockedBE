import { browser } from 'protractor';
import { After, Status } from 'cucumber';
import * as fs from 'fs';

After((scenario) => {
  if (scenario.result.status === Status.FAILED) {
    const fileName = `${scenario.pickle.name.replace(/ /g, '_')}_failure.png`;
    return browser.takeScreenshot().then((data) => {
      fs.writeFileSync(fileName, data, 'base64');
    });
  }
});
