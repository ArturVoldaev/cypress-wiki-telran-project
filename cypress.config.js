const { defineConfig } = require("cypress");
const logger = require("cypress-terminal-report/src/installLogsPrinter")


module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  video: false,
  e2e: {
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 'cypress/api/**/*.cy.{js,jsx,ts,tsx}'],
    baseUrl: "http://wiki.telran-edu.de:8989",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const options = {
        outputRoot: config.projectRoot + "/logs/",
        outputTarget: {
          "out.txt": "txt",
        },
      };
      
      logger(on, options);
      return config;
    },
    env: {
      URL: "http://wiki.telran-edu.de:8989",
      LOGIN: "PapaTester",
      PASSWORD: "PapaTesterPapaTester",
      SEND_API: "/api.php",
      SPEED_RESPONSE: 5000,
      pageID: 50 || Cypress.env("pageID"),
      projectRoot: "/logs/",
    },
  },
});
