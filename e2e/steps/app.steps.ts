import { Given, Then, When } from 'cucumber';
import { DashboardPage } from '../dashboard.po';
import { ManagePage } from '../manage.po';
import { browser, protractor } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const ngApimock: any = browser['ngApimock'];

const dashboard: DashboardPage = new DashboardPage();
const manage: ManagePage = new ManagePage();

Given(/^I am on the home page$/, () => {
  ngApimock.setAllScenariosToDefault();
  browser.get('/');
});

When(/^I click on (.*?)$/, (option: string) => {
  if (option === 'dashboard') {
    return dashboard.navigateTo();
  } else {
    return manage.navigateTo();
  }
});

Then(/^I see (the default|[0-9]+) stock cards$/, (numberOfCards) => {
  let expectedNumbersOfCards = 5;
  if (numberOfCards !== 'the default') {
    expectedNumbersOfCards = +numberOfCards;
  }

  return expect(dashboard.getCards().count()).to.eventually.equal(expectedNumbersOfCards);
});

Then(/^I see (the|a [0-9]+ length) symbols list$/, (numberOfSymbols) => {
  let expectedNumbersOfSymbols = 5;

  if (numberOfSymbols !== 'the') {
    expectedNumbersOfSymbols = +numberOfSymbols.split(' ')[1];
  }

  return expect(manage.getSymbols().count()).to.eventually.equal(expectedNumbersOfSymbols);
});

When(/^I add "(.*?)" stock$/, (stockCode: string) => {
  ngApimock.selectScenario('stocks', 'successful-get-6');
  return manage.getAddInput().sendKeys(stockCode, protractor.Key.RETURN);
});

Then(/^I see (first|last) symbol is( not)? "(.*?)"$/, (position: string, isNot: string, stockCode: string) => {
  const negate = isNot === ' not';
  let assertion = expect(manage.getSymbols().first().getText());

  if (position === 'last') {
    assertion = expect(manage.getSymbols().last().getText());
  }

  if (negate) {
    assertion = assertion.not;
  }

  return assertion.to.eventually.equal(stockCode);
});

When(/^I remove first symbol$/, () => {
  ngApimock.selectScenario('stocks', 'successful-get-4');
  return manage.getRemoveButton(0).click();
});

When( /^pause$/, () => {
  browser.pause();
});


