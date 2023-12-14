# Cypress Wiki Telran Project

![Project Logo](path/to/your/logo.png)

## Overview

This project is a test automation framework for [Cypress](https://www.cypress.io/) designed for testing a Wiki application developed by Telran. The framework aims to provide a robust and maintainable set of automated tests to ensure the functionality, reliability, and performance of the Wiki application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ArturVoldaev/cypress-wiki-telran-project-.git

2. Navigate to the project folder:

    cd cypress-wiki-telran-project

3. Install dependencies:

    npm install

## Usage
To use this Cypress framework for testing the Telran Wiki application, follow these steps:

Configure the test environment [Configuration](see #Configuration).
Write new test cases or modify existing ones in the cypress/api or cypress/e2e folders.
Run the tests [Running Tests](see #running-tests).

## Folder Structure
```
cypress-wiki-telran-project
│
├── cypress/
│   ├── api
│   ├── e2e/
│   ├── fixtures/
│   ├── pages/
│   └── support/
│       └── api-request
│
│
│
├── .gitignore
├── reporter-config.json
├── cypress.config.js
├── package.json
└── README.md
```

- cypress/: Contains Cypress-specific folders and files for organizing tests and configurations.
- cypress/fixtures/: Stores static test data in JSON files.
- cypress/e2e/ and cypress/api/: Houses test scripts organized by features or functionality.
- cypress/support/: Cypress support files (commands, helpers, etc.).
- cypress/pages/: classes of pages.

- .gitignore: Specifies files and folders to be ignored by Git.
- cypress.config.js: Cypress configuration file.
- reporter-config.json: Reporter configuration file.
- package.json: Project metadata and dependencies.

## Configuration
The cypress.config.js file contains configuration settings for Cypress. Update this file to match your specific test environment, URLs, and other parameters.

## Writing Tests
Tests are written in JavaScript using Cypress's testing syntax. Organize your test scripts in the cypress/api or cypress/e2e folder. Follow best practices for creating modular and maintainable tests.

## Running Tests
To run the tests, execute the following command:
``` Terminal
npm test-headless
```