import { browser } from 'protractor';
import { After, HookScenarioResult, Status } from 'cucumber';
import * as fs from 'fs';

After(function(scenario: HookScenarioResult) {
  const world = this;

  if (scenario.result.status === Status.FAILED) {
    const fileName = `${scenario.pickle.name.replace(/ /g, '_')}_failure.png`;
    return browser.takeScreenshot().then((screenShotData) => {
      world.attach(screenShotData, 'image/png');
    });
  }
});
