
/*
    describe means test suite
    context means describe alias
    it means test case
*/
describe('EF portal login page custom commands', function () {
    beforeEach(function setUser() {
        // var hfv2 = user.filter(function (e) { return e.type == "high_flyer_v2";})[0]
        cy.loginPortalByUI(Cypress.env('username'), Cypress.env('password'))
    })

    const expectedResult = 'Progress Test'

    it('EF portal login', function () {
        cy.checkElementPresent(expectedResult)
        cy.contains('Progress Test').click()
        cy.checkPtUi()
    })
})


