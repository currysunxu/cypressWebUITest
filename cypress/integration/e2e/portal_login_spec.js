/// <reference types="cypress" />

const checkGrammarProUI = () => {
  cy.contains('欢迎来到Grammar Pro')
  .should('be.visible')
}

const checkMockTestUI = () => {
  cy.contains('MOCK TEST').should('be.exist')
}

const checkOnlineClassUI = () => {
  cy.get('.ef-osd-resource-content')
  .should('be.exist')
}

const checkStoryTellerUI = () => {
  cy.get('.ef-container').first().should('have.text', 'Storytellers')
}


describe('Login Portal and verify portal homepage', function () {

  it("Given a small_star_v3 User and Login Then He Can Study Course From Portal", () => {
    cy.portalLogin('small_star_v3')
    cy.checkPortalPageLoaded()
    cy.smallStarPortalCheck()
  })

  it("Given a High Flyer V2 User and Login Then He Can Study Course From Portal", () => {
    cy.portalLogin('high_flyer_v2')
    cy.checkPortalPageLoaded()
    cy.window_open('Start');
    cy.openNewWindowByLocalStorage('hf_study_url', 'version1')
  })

  it("Given a High Flyer V3 User and Login Then He Can Study Course From Portal", () => {
    cy.portalLogin('high_flyer_v3')
    cy.checkPortalPageLoaded()
    cy.window_open('Start');
    cy.openNewWindowByLocalStorage('hf_study_url', 'version1')
  })

  it("Given a Traiblazer V3 User and Login Then He Can Study Course From Portal", () => {
    cy.portalLogin('traiblazer_v3')
    cy.checkPortalPageLoaded()
    cy.window_open('Start');
    cy.openNewWindowByLocalStorage('tb_study_url', 'version3')
  })

  it("Given a Front Runner User and Login Then He Can Study Course From Portal", () => {
    cy.portalLogin('front_runner')
    cy.checkPortalPageLoaded()
    cy.window_open('Start');
    cy.openNewWindowByLocalStorage('fr_study_url', 'version1')
  })
})

describe('Verify each product card', function () {
  this.beforeEach(() => {
    cy.portalLogin('username')
  })

  it("Verify grammar pro card", () => {
    cy.window_open("Grammar Pro");
    cy.openNewWindowByLocalStorage('gp_study_url', 'version3')
    checkGrammarProUI()
    })

  it("Verify Online Class card", () => {
    cy.window_open("Online Class");
    cy.openNewWindowByLocalStorage('osd_study_url', 'XEFTOKEN')
    checkOnlineClassUI()
  })

  it("Verify Story Teller card", () => {
    cy.window_open("Storytellers");
    cy.visit('https://study-staging.ef.cn/portal/#/story-teller')
    checkStoryTellerUI()
  })

  it("Verify Mock Test card", () => {
    cy.window_open("Mock Test");
    cy.openNewWindowByLocalStorage('mt_study_url', 'XEFTOKEN')
    checkMockTestUI()
  })

  it("Verify Progress Test card", () => {
    cy.checkPortalPageLoaded()
    cy.enterProgressTest()
    cy.checkPtUi()
  })
})

