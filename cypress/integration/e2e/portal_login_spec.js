describe('Login Portal and verify portal homepage', function () {

  it("Given a small_star_v3 User and Login Then He Can Study Course From Portal", () => {
    cy.portalLogin('small_star_v3')
    cy.checkPortalPageLoaded()
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
    cy.contains('欢迎来到Grammar Pro')
      .should('be.visible')
  })

  it("Verify Online Class card", () => {
    cy.window_open("Online Class");
    cy.visit('https://study-online-staging.ef.cn/')
    cy.get('.ef-osd-resource-content')
      .should('be.exist')
  })

  it("Verify Story Teller card", () => {
    cy.window_open("Storytellers");
    cy.visit('https://study-staging.ef.cn/portal/#/story-teller')
    cy.get('.ef-container').first().should('have.text', 'Storytellers')
  })

  it("Verify Mock Test card", () => {
    cy.window_open("Mock Test");
    cy.openNewWindowByLocalStorage('mt_study_url', 'XEFTOKEN')
    cy.contains('MOCK TEST').should('be.exist')
  })

  it("Verify Progress Test card", () => {
    cy.contains("Progress Test").click()
    cy.contains("Progress Test").should('be.visible')
    cy.get('*[class^="back"]').click()
    cy.checkPortalPageLoaded()
  })
})