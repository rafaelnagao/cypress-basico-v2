const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dx76ge',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
