const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "experimentalStudio": true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: "https://ufal-point-dev.ufal.hide.ms.mff.cuni.cz",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
