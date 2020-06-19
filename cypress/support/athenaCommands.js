Cypress.Commands.add('checkAthenaHomePage', () => {
  //check element exist or not
  cy.contains('Athena').should('exist')

  //check element visible or not
  cy.contains('Athena').should('be.visible')
  cy.contains('Small Stars 3.0').should('be.visible')
  cy.contains('High Flyers 3.0').should('be.visible')
  cy.contains('Trailblazers 3.0').should('be.visible')
  cy.contains('Frontrunner').should('be.visible')
  cy.contains('Academies').should('be.visible')
  cy.contains('OMNI').should('be.visible')
  cy.contains("Let's talk").should('be.visible')

})