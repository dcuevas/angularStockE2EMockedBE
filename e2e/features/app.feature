Feature: Stock App
  As stock inverter
  I want to know current stock prices
  So that I can buy/sell stocks

  Scenario: Load the dashboard default list
    Given I am on the home page
     When I click on dashboard
     Then I see the default stock cards

  Scenario: Load the manage stock view
    Given I am on the home page
     When I click on manage
     Then I see the symbols list

  Scenario: Add a new stock and be updated in dashboard
    Given I am on the home page
      And I click on dashboard
      And I see 7 stock cards
     When I click on manage
      And I add "MSFT" stock
     Then I see last symbol is "MSFT"
      And I click on dashboard
      And I see 6 stock cards

  Scenario: Remove a stock and be updated in dashboard
    Given I am on the home page
      And I click on dashboard
      And I see 5 stock cards
      And I click on manage
      And I see first symbol is "AAPL"
     When I remove first symbol
     Then I see first symbol is not "AAPL"
      And I click on dashboard
      And I see 4 stock cards
