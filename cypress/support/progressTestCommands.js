// ***********************************************
// encapsulate progress test custom command

Cypress.Commands.add('checkElementPresent', (expectedText) => {
  //check element exist or not
  cy.contains(expectedText).should('exist')

  //check element visible or not
  cy.contains(expectedText).should('be.visible')

})

Cypress.Commands.add('checkPtUi', () => {
  cy.contains('Unit Quiz').should('be.visible')
  cy.contains('Book').should('be.visible')
  cy.contains('Unit').should('be.visible')
})

Cypress.Commands.add('enterProgressTest', () => {
  cy.contains("Unit Quiz").click()
  cy.contains("Unit Quiz").should('be.visible')
})