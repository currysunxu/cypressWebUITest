describe('JWT', () => {
    before(function setUser () {
        cy.loginPortalByApi()
    })
    it('is logged in', () => {
        var expectedList = ["Start", "Let’s practice!"]
        expectedList.forEach(element => {
            cy.checkElementPresent(element)
        });
        cy.contains('Progress Test').click()

    })
})

/*describe('Loading test data by fixture', () => {
    it('loads', () => {
        cy.fixture('users').then((json) => {
            debugger
            console.log(json)
            for (const user of json) {
                cy.loginPortalByUI(user.username, user.password)
            }
        })
    })
})*/



