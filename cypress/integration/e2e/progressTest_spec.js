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
        cy.contains("查看结果").should('be.visible')
        cy.contains("等待老师评分。").should('be.visible')
        cy.contains("开始测试").should('be.visible')
        cy.contains("待完成的单元测试。").should('be.visible')
    })

    it('check progress test result', function () {
        cy.enterProgressTest()
        cy.get('.test-item__link-2wkizOcLJl').first().click()
        cy.get('.test-details__result-description-SeMf0Sra5l').should('have.text', '你将在写作及口语测试评分完成后获得本单元测试总分。')

        cy.contains("Grammar").should('be.visible')
        cy.contains("Vocabulary").should('be.visible')
        cy.contains("Listening").should('be.visible')
        cy.contains("Reading").should('be.visible')
        cy.contains("Writing").should('be.visible')
        cy.contains("Speaking").should('be.visible')
        cy.contains("Grammar").click()
        cy.get('.txt-1hvfi9ZpL9').first().should('have.text', '上一题')
        cy.get('.txt-1hvfi9ZpL9').last().should('have.text', '下一题')
        cy.get('.review-header__right-2Ewo_FSHUc > span').should('have.text', '退出')
        cy.get('.navigation-bar__icon-menu-21c94dPpgj').click()
        cy.get('.rc-dialog-mask').should('not.have.class', 'rc-dialog-mask-hidden')
        cy.get('.rc-dialog-title').should('have.text', '答题回顾')
        cy.get('.Button-sc-8m3ouq-0').click()
        cy.get('.rc-dialog-mask').should('have.class', 'rc-dialog-mask-hidden')
    })

})


