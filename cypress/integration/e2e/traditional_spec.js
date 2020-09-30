describe('Login Portal and verify portal homepage', function () {

    it("Given a small_star_v3 User and Login Then He Can Study Course From Portal", () => {
        cy.portalLogin('small_star_v3')
        cy.checkPortalPageLoaded()
        cy.smallStarPortalCheck()
    })

    it("Given a High Flyer V2 User and Login Then He Can Study Course From Portal", () => {
        cy.portalLogin('high_flyer_v2')
        cy.checkPortalPageLoaded()
        cy.window_open("sp-banner-animation__btn", "class");
        cy.openNewWindowByLocalStorage('hf_study_url', 'version1')
    })

    it("Given a High Flyer V3 User and Login Then He Can Study Course From Portal", () => {
        cy.portalLogin('high_flyer_v3')
        cy.checkPortalPageLoaded()
        cy.window_open("sp-banner-animation__btn", "class");
        cy.openNewWindowByLocalStorage('hf_study_url', 'version1')
    })

    it("Given a Traiblazer V3 User and Login Then He Can Study Course From Portal", () => {
        cy.portalLogin('traiblazer_v3')
        cy.checkPortalPageLoaded()
        cy.window_open("sp-banner-animation__btn", "class");
        cy.openNewWindowByLocalStorage('tb_study_url', 'version3')
    })

    it("Given a Front Runner User and Login Then He Can Study Course From Portal", () => {
        cy.portalLogin('front_runner')
        cy.checkPortalPageLoaded()
        cy.window_open("sp-banner-animation__btn", "class");
        cy.openNewWindowByLocalStorage('fr_study_url', 'version1')
    })
})