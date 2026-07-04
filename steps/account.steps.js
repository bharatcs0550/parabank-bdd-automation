const { expect } = require('@playwright/test');
const { createBdd } = require('playwright-bdd');
const { RegistrationPage } = require('../pages/Registration');
const { LoginPage } = require('../pages/login');
const { AccountPage } = require('../pages/account');
const { generateUser } = require('../utils/datagenerator');

const { Given, When, Then } = createBdd();

let user;

Given('I am on the ParaBank registration page', async ({ page }) => {
  await page.goto('/parabank/register.htm');
});

When('I register with valid unique user details', async ({ page }) => {
  user = generateUser();
  const registrationPage = new RegistrationPage(page);
  await registrationPage.register(user);
});

Then('I should be registered and logged in successfully', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const message = await registrationPage.getSuccessMessage();
  expect(message).toContain('Your account was created successfully');
});

When('I log out and log back in with the same credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logout();
  await loginPage.login(user.username, user.password);
});

Then('I should see my account balance on the overview page', async ({ page }) => {
  const accountPage = new AccountPage(page);
  const balance = await accountPage.getBalance();
  console.log(`Account balance for ${user.username}: ${balance}`);
  expect(balance).toBeTruthy();
});


When('I register with mismatched passwords', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
  const mismatchUser = generateUser();
  await registrationPage.registerWithMismatchedPasswords(mismatchUser);
});

Then('I should see a password mismatch error', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const error = await registrationPage.getErrorMessage();
  expect(error).toBeTruthy();
});

Given('I am on the ParaBank login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I attempt to login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('invalidUser_' + Date.now(), 'wrongPassword123');
});

Then('I should see an invalid login error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const error = await loginPage.getErrorMessage();
  expect(error).toBeTruthy();
});