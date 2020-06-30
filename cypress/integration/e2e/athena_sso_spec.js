describe('athena sso', () => {
    it('test athena', () => {
        cy.loginAthenaByAzureSso(Cypress.env("sso_username"),Cypress.env("sso_password"))
        cy.checkAthenaHomePage()
    });
});