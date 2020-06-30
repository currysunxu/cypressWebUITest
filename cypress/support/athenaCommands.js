Cypress.Commands.add('loginAthenaByAzureSso', ( userId, pwd ) => {
  cy.request({
    method:'POST',
    url: Cypress.config('internal_athena_url'),
    headers:
        {
          'X-BA-TOKEN':'3C40AB54-798C-4517-A82A-26017EE98285'
        },
    body: {
      "AccessIdentifier" : userId,
      "Token" : pwd,
      "Realm": Cypress.config('athena_url').split('//')[1],
      "Platform" : 0,
      "DeviceType": 0,
      "DeviceId": "",
      "DeviceName":""
    }
  })
      .then((resp)=>{
        const token = resp.body['Token']
        debugger
        console.log(token)
        cy.setCookie("token",token)
        cy.setCookie("userId", userId);
        cy.setCookie("userName", userId);
        cy.visit(Cypress.config('athena_url'))
      })
})

Cypress.Commands.add('checkAthenaHomePage', () => {
  //check element exist or not
  cy.contains('Athena').should('exist')

  //check element visible or not
  cy.contains('Athena').should('be.visible')
  cy.contains('Small Stars 3.0').should('be.visible')
  cy.contains('High Flyers 3.0').should('be.visible')
  cy.contains('Trailblazers 3.0').should('be.visible')
  cy.contains('Frontrunner').should('be.visible')
  cy.contains('Academies').should('be.visible')
  cy.contains('OMNI').should('be.visible')
  cy.contains("Let's Talk!").should('be.visible')

})