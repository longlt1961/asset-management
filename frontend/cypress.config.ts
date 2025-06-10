const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://retc-deployment-sprint13.s3-website-ap-northeast-1.amazonaws.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
