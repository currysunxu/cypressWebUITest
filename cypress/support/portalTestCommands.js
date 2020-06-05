Cypress.Commands.add('portalLogin', (type) => {
  cy.loginPortalByUI(Cypress.env(type), Cypress.env('password'))
})

Cypress.Commands.add('checkPortalPageLoaded', () => {
  cy.url().should('include', '/portal/#/layout') 
  //Check common header loaded
  cy.get('.ef-logo--simple').should('exist')
  cy.get('*[class^="user-account__name"]').contains("Hi")
  cy.should('exist','*[class^="user-account__avatar"]')
  //Check common Elements loaded
  cy.contains("Let’s practice!").should('be.visible')
})