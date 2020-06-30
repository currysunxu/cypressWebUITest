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

Cypress.Commands.add('smallStarPortalCheck', () => {
  cy.contains("Get the App").click()
  //Check the pop up displays
  cy.should('exist', '.switch-scrolling-effect')
  cy.get('*[class^="sp-banner-dialog__title"]')
    .should('have.text', 'Scan & Start')
  cy.get('*[class^="sp-banner-dialog__content"]>div')
    .should('have.length', 2)
    .should('be.visible')
  cy.contains("iOS")
    .should('be.visible')
  cy.contains("Android")
    .should('be.visible')
  //Click on the x icon will close the pop up
  cy.get('*[class^="-close"]').click()
  cy.get('.rc-dialog-mask-hidden')
    .should('exist')
  })