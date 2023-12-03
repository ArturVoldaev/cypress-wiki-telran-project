const { defineConfig } = require("cypress");


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
    setupNodeEvents(on, config) {
      const options = {
        outputRoot: config.projectRoot + "/logs/",
        outputTarget: {
          "out.txt": "txt",
        },
      };

      require("cypress-terminal-report/src/installLogsPrinter")(on, options);

      //return require("./cypress/plugins/index")(on, config)

      return config;
    },

    env: {
      URL: "http://wiki.telran-edu.de:8989",
      LOGIN: "Papatester",
      PASSWORD: "PapatesterPapatester",
      SEND_API: "/api.php",
      //allure
      projectRoot: "/logs/",
    },
  },
});
