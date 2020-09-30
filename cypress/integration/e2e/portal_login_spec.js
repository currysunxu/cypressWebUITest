/// <reference types="cypress" />

const checkGrammarProUI = () => {
  cy.contains('欢迎来到Grammar Pro')
      .should('be.visible')
}

const checkMockTestUI = () => {
  cy.contains('Mock Test').should('be.exist')
}

const checkOnlineClassUI = () => {
  cy.get('.ef-osd-resource-content')
      .should('be.exist')
}

const checkStoryTellerUI = () => {
  cy.get('.ef-container').first().should('have.text', 'Storytellers')
}

describe('Verify each product card', function () {
  this.beforeEach( function() {
    cy.skipByEnv('live_sg')
    cy.portalLogin('username')
  })

  it("Verify grammar pro card", () => {
    cy.window_open("Grammar Pro", "text");
    cy.openNewWindowByLocalStorage('gp_study_url', 'version3')
    checkGrammarProUI()
  })

  it("Verify Online Class card", () => {
    cy.window_open("Online Class", "text");
    cy.openNewWindowByLocalStorage('osd_study_url', 'idToken')
    checkOnlineClassUI()
  })

  it("Verify Story Teller card", function() {
    cy.skipByEnv('live')
    cy.window_open("Storytellers", "text");
    cy.visit(Cypress.config('baseUrl')+('portal/#/story-teller'))
    checkStoryTellerUI()
  })

  it("Verify Mock Test card", () => {
    cy.window_open("Mock Test", "text");
    cy.openNewWindowByLocalStorage('mt_study_url', 'idToken')
    checkMockTestUI()
  })

  it("Verify Unit Quiz card", () => {
    cy.checkPortalPageLoaded()
    cy.enterProgressTest()
    cy.checkPtUi()
  })
})

