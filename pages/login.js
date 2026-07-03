class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.logoutLink = page.locator('a[href*="logout"]');
    this.errorMessage = page.locator('#rightPanel .error');
  }

  async goto() {
    await this.page.goto('/parabank/index.htm');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };