const { defineConfig } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.js',
});

module.exports = defineConfig({
  testDir,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://parabank.parasoft.com',
    headless: !!process.env.CI,  
    screenshot: 'on',          
    video: 'on',
    trace: 'on',               
  },
});