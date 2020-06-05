describe.only(' portal login page custom commands', function () {
    let userName =  Cypress.env('hf_username')
    let password = Cypress.env('password')

    beforeEach(function setUser() {
        cy.loginPortalByUI(userName, password)
    })

    it(' product window open', function () {
        //ToDo need refactor by dynamic way
        cy.wait(5000)
        cy.openNewWindowByVersionOneToken()
        cy.get('.NHF_Web_Home_Logo').should('be.visible')
        cy.get('.NHF_Web_Home_Name').should('be.visible')
        var expectedList = ["Study", "Game","Power-Ups","Freeze","Hint","Score Boost","Shield","Slow Motion"]
        expectedList.forEach(element => {
            cy.contains(element).should('be.visible')
        });
    })
})


