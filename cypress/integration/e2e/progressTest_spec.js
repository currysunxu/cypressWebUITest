require('cypress-xpath')
describe('EF portal login page custom commands', function () {

    const expectedResult = 'Progress Test'

    const expectedProgressTestStatus = {
        "Unit 1":{"View Result":"Waiting for your score."},
        "Unit 2":{"View Result":"33%"},
        "Unit 4":{"Take Test":"You can take the test now."}
    }
    

    beforeEach(function setUser() {
        // var hfv2 = user.filter(function (e) { return e.type == "high_flyer_v2";})[0]
        cy.loginPortalByUI(Cypress.env('username'), Cypress.env('password'))
    })


    it('EF portal login', function () {
        cy.checkElementPresent(expectedResult)
        cy.enterProgressTest()
        cy.checkPtUi()
    })

    it.only('check progress test status', function () {
        
        cy.then(() =>{
            debugger
        var units = ['Unit 1','Unit 2','Unit 4']
        cy.enterProgressTest()
        cy.checkPtUi()
            for (const unit of units) {
                cy.xpath("//div[text()='Unit 1']/parent::div/parent::div/div[2]//div[text()]").should('have.text', expectedProgressTestStatus[unit])
            }
        })
        
    })
})


