const { defineConfig } = require("cypress");
const logger = require("cypress-terminal-report/src/installLogsPrinter")


module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report",
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    baseUrl: "http://wiki.telran-edu.de:8989",
    setupNodeEvents(on, config) {
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
      LOGIN: "Papatester",
      PASSWORD: "PapatesterPapatester",
      SEND_API: "/api.php",
      SPEED_RESPONSE: 600,
      //allure
      projectRoot: "/logs/",
    },
  },
});
