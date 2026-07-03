class AccountPage {
  constructor(page) {
    this.page = page;

    
    this.accountsOverviewHeader = page.locator('h1.title', { hasText: 'Accounts Overview' });
    this.accountsTable = page.locator('#accountTable');
    this.balanceCells = page.locator('#accountTable tbody tr td:nth-child(2)');
    this.welcomeMessage = page.locator('.smallText');
  }

  async goto() {
    await this.page.goto('/parabank/overview.htm');
  }

  async isLoaded() {
    await this.accountsOverviewHeader.waitFor({ state: 'visible' });
    return await this.accountsOverviewHeader.isVisible();
  }

  async getBalance() {
    // Wait for the accounts table to be visible
    await this.accountsTable.waitFor({ state: 'visible' });
    // Get the first account's balance
    const balance = await this.balanceCells.first().textContent();
    return balance.trim();
  }

  async getWelcomeMessage() {
    return await this.welcomeMessage.textContent();
  }
}

module.exports = { AccountPage };