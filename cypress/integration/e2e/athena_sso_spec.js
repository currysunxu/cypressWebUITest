describe('athena sso', () => {
    it.skip('test athena', () => {
        cy.loginAthenaByAzureSso(Cypress.env("sso_username"),Cypress.env("sso_password"))
        cy.checkAthenaHomePage()
    });
});