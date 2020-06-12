/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
 */

const fs = require('fs-extra')
const path = require('path')

const  getConfigurationByFile = async (file) => {
  const pathToConfigFile = path.resolve('.', 'cypress/config', `${file}.json`)
  console.log(await fs.readJson(pathToConfigFile))
  return fs.readJson(pathToConfigFile)
}

// plugins file
module.exports = (on, config) => {
  // accept a configFile value or use development by default
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.family === 'chromium') {
      console.log('Adding Chrome flag: --disable-dev-shm-usage');
      launchOptions.args.push('--disable-dev-shm-usage');
    }
    return launchOptions;
  })
  console.log(config)
  const file = config.env.configFile || 'stg'
  return getConfigurationByFile(file)
  
}

