const { defineConfig } = require("cypress");
const logger = require("cypress-terminal-report/src/installLogsPrinter")


module.exports = defineConfig({
  reporter: "mochawesome",
  //screenshotsFolder:"/",
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report",
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 'cypress/api/**/*.cy.{js,jsx,ts,tsx}'],
    baseUrl: "http://wiki.telran-edu.de:8989",
    setupNodeEvents(on, config) {
      screenshotOnRunFailure=true;
      const options = {
        outputRoot: config.projectRoot + "/logs/",
        outputTarget: {
          "out.txt": "txt",
        },
      };

      logger(on, options);

      //return require("./cypress/plugins/index")(on, config)

      return config;
    },

    

    env: {
      URL: "http://wiki.telran-edu.de:8989",
      LOGIN: "PapaTester",
      PASSWORD: "PapaTesterPapaTester",
      SEND_API: "/api.php",
      SPEED_RESPONSE: 5000,
      pageID: 50 || Cypress.env("pageID"),
      //allure
      projectRoot: "/logs/",
    },
  },
});
