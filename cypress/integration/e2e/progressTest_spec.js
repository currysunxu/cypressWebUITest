require('cypress-xpath')
describe('EF portal login page custom commands', function () {

    const expectedResult = 'Progress Test'
    
    beforeEach(function setUser() {
        // var hfv2 = user.filter(function (e) { return e.type == "high_flyer_v2";})[0]
        cy.loginPortalByUI(Cypress.env('username'), Cypress.env('password'))
    })


    it('EF portal login', function () {
        cy.checkElementPresent(expectedResult)
        cy.enterProgressTest()
        cy.checkPtUi()
    })

    it('check progress test status', function () {
        cy.enterProgressTest()
        cy.contains("View Result").should('have.text',"View Result")
        cy.contains("Take Test").should('have.text',"Take Test")
        cy.contains("You can take the test now.").should('have.text',"You can take the test now.")
        cy.contains("Waiting for your score.").should('have.text',"Waiting for your score.")
    })

    it('check progress test result', function () {
        cy.enterProgressTest()
        cy.xpath("//div[text()='Waiting for your score.']/parent::div/parent::div/div[2]//a").click()
        cy.contains("Your total score will be available after your writing and speaking assessment.").should('have.text',"Your total score will be available after your writing and speaking assessment.")
        cy.contains("Grammar").should('contain',"Grammar")
        cy.contains("Vocabulary").should('contain',"Vocabulary")
        cy.contains("Listening").should('contain',"Listening")
        cy.contains("Reading").should('contain',"Reading")
        cy.contains("Writing").should('have.text',"Writing")
        cy.contains("Speaking").should('have.text',"Speaking")
        cy.xpath("//span[text()='Waiting']/parent::div/preceding-sibling::div").should('contain',"Writing").should('contain',"Speaking")
    })
})


