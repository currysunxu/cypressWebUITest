describe.only(' portal login page custom commands', function () {
    let userName = Cypress.env('high_flyer_v3')
    let password = Cypress.env('password')

    beforeEach(function setUser() {
        cy.loginPortalByUI(userName, password)
    })

    it(' product window open', function () {
        cy.get('.sp-banner__title').should('be.visible')
        cy.openNewWindowByLocalStorage('hf_study_url', 'version1')
        cy.get('.NHF_Web_Home_Logo').should('be.visible')
        cy.get('.NHF_Web_Home_Name').should('be.visible')
        var expectedList = ["Study", "Game", "Power-Ups", "Freeze", "Hint", "Score Boost", "Shield", "Slow Motion"]
        expectedList.forEach(element => {
            cy.contains(element).should('be.visible')
        });
    })
})


