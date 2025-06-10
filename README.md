# Playwright Automation Framework with TypeScript

This project provides an end-to-end automation testing framework using [Playwright](https://playwright.dev/) with **TypeScript**. It enables fast and reliable browser automation across Chromium, Firefox, and WebKit. This framework is ideal for functional, UI, and integration testing for modern web applications.

## 📦 Features

- 🚀 Built with [Playwright](https://playwright.dev/)
- 📘 Written in TypeScript for type safety and scalability
- 🧪 Organized test structure using Playwright Test Runner
- 📁 Page Object Model (POM) for maintainability
- 💾 Utilities for API automation and data handling
- 📄 ExcelJS integration for reading/writing Excel files
- 🧹 Pre-configured with linting and scripts for ease of use

---

## 🛠️ Project Setup

### Prerequisites

- Node.js (>= 18.x)
- npm or yarn
- Git

### Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/PlayWrightAutomationTS.git
cd PlayWrightAutomationTS
npm install
```

Install Playwright Browsers:
npx playwright install

Project structure:
PlayWrightAutomationTS/
│
├── tests/ # Test files (UI and API tests)
│ ├── uploadDownload.spec.ts # Example test for Excel upload/download
│ └── orderIntercept.spec.ts # Example test using API mocks
│
├── pages/ # Page Object Model classes
│ └── loginPage.ts
│
├── utils/ # Utility helpers
│ └── apiUtils.ts # API request utilities
│
├── test-data/ # Test data (optional)
│
├── playwright.config.js # Playwright configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Project metadata and scripts
└── README.md # Project documentation

📋 Scripts :

Run all tests:
npx playwright test

Run a specific test file:
npx playwright test tests/uploadDownload.spec.ts

Generate an HTML report:
npx playwright show-report
