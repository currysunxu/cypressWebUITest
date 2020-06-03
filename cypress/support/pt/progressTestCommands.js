// ***********************************************
// This example commands.js shows you how to

Cypress.Commands.add('checkElementPresent', (expectedText) => {
  //check element exist or not
  cy.contains(expectedText).should('exist')

  //check element visible or not
  cy.contains(expectedText).should('be.visible')

})