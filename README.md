# ParaBank Account Registration & Login — Automation Suite

Automated end-to-end test suite for the ParaBank demo application, covering account registration, login, logout, and account balance verification. Built for the Incubyte Software Craftsperson assignment.

**Application under test:** https://parabank.parasoft.com/parabank/index.htm

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- [playwright-bdd](https://github.com/vitalets/playwright-bdd) — BDD support for Playwright
- [Cucumber](https://cucumber.io/) — Gherkin syntax for feature files
- Page Object Model (POM) architecture
- GitHub Actions — CI pipeline

## Project Structure

\`\`\`
parabank-bdd/
├── features/
│   └── account.feature          # Gherkin scenarios (positive + negative)
├── pages/
│   ├── Registration.js          # Registration page object
│   ├── login.js                 # Login page object
│   └── account.js               # Account overview page object
├── steps/
│   └── account.steps.js         # Step definitions binding Gherkin to page objects
├── utils/
│   └── datagenerator.js         # Generates unique test user data
├── .github/workflows/
│   └── playwright.yml           # CI pipeline (GitHub Actions)
├── TestCases.xlsx                # Documented test cases (positive + negative)
├── playwright.config.js
└── package.json
\`\`\`

## Scenarios Covered

| # | Scenario | Type |
|---|----------|------|
| 1 | Register a new account, log in, log out, log back in, and view balance | Positive |
| 2 | Registration fails when Password and Confirm Password do not match | Negative |
| 3 | Login fails with invalid username/password | Negative |

Additional negative cases (blank required field, duplicate username, blank password login) are documented in `TestCases.xlsx` for manual/future coverage.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

## Setup

Clone the repository and install dependencies:

\`\`\`bash
git clone <your-repo-url>
cd parabank-bdd
npm install
npx playwright install
\`\`\`

## Running the Tests

Generate the BDD test files from the Gherkin feature files, then run the suite:

\`\`\`bash
npx bddgen
npx playwright test
\`\`\`

By default, tests run in a **visible browser** locally (`headless: false` in `playwright.config.js`). On CI (GitHub Actions), tests automatically run **headless** — no configuration changes needed, this is handled via an environment check (`headless: !!process.env.CI`).

## Viewing the Test Report

After a run, an HTML report is generated with step-by-step results, screenshots, and traces:

\`\`\`bash
npx playwright show-report
\`\`\`

## Continuous Integration

Every push and pull request to `main`/`master` automatically triggers the test suite via GitHub Actions (`.github/workflows/playwright.yml`). The workflow:

1. Checks out the repository
2. Installs Node.js and dependencies
3. Installs Playwright browsers
4. Generates BDD test files (`npx bddgen`)
5. Runs the full test suite headless
6. Uploads the HTML report as a downloadable artifact, even on failure

Check the **Actions** tab on GitHub to view run history and download reports.

## Test Documentation

`TestCases.xlsx` contains the full list of test cases (positive and negative), including test steps, affected functionality, execution status (automated vs. manual), and results — as required by the assignment.

## Notes

- Test data (username, email, etc.) is generated dynamically per run using timestamps, so tests can be re-run repeatedly without collisions on ParaBank's shared demo environment.
- Proof of execution is captured automatically via Playwright's built-in screenshot, video, and trace recording (configured in `playwright.config.js`).