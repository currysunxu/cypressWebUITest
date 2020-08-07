require('cypress-xpath')
describe('EF portal login page custom commands', function () {

    const expectedResult = 'Unit Quiz'

    const getIframeBody = () => {
        // try to get iframe > document > body
        // untill body element not null
        return cy
            .get('iframe')
            .its('0.contentDocument.body').should('not.be.empty')
            // wrapper body DOM element to append more Cypress command, like ".find(...)"
            // wrap command https://on.cypress.io/wrap
            .then(cy.wrap)
    }
    
    beforeEach(function setUser() {
        // var hfv2 = user.filter(function (e) { return e.type == "high_flyer_v2";})[0]
        cy.portalLogin('username')
    })


    it('EF portal login', function () {
        cy.checkElementPresent(expectedResult)
        cy.enterProgressTest()
        cy.checkPtUi()
    })

    it('check progress test status', function () {
        cy.enterProgressTest()
        cy.contains("View Result").should('have.text',"View Result")
        cy.contains("Take Quiz").should('have.text',"Take Quiz")
        cy.contains("You can take the quiz now.").should('have.text',"You can take the quiz now.")
        cy.contains("Waiting for your score.").should('have.text',"Waiting for your score.")
    })

    it.only('check progress test result', function () {
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
        cy.contains("Grammar").click()
        cy.contains("Previous").should('contain',"Previous")
        cy.contains("Next").should('contain',"Next")
        cy.contains("Quit").should('contain',"Quit")
        getIframeBody().contains("correct").should('contain',"Choose the correct answers.")
        getIframeBody().contains("ANSWER").click()
        getIframeBody().xpath("//input[@checked='checked']").should('exist')
    })

})


