Feature: ParaBank Account Registration and Login

  As a new ParaBank user
  I want to register an account and log in
  So that I can view my account balance

  Scenario: Register a new account, log in, and view balance
    Given I am on the ParaBank registration page
    When I register with valid unique user details
    Then I should be registered and logged in successfully

    When I log out and log back in with the same credentials
    Then I should see my account balance on the overview page