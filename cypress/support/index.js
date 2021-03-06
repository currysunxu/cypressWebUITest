require('cypress-plugin-retries')
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commonCommands'
import './progressTestCommands'
import './portalTestCommands'
import './athenaCommands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// export const TARGET_ENV = Cypress.env('testEnv') || Cypress.config('targetEnv')
// beforeEach(( ) =>{
//     cy.log('testing env is \n ${JSON.stringify(targetEnv)}')
//     Cypress.config('baseUrl',Cypress.env(TARGET_ENV).Url)
// })

