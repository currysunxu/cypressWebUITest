import { testLoginUser } from '../testData/testLogin.data' 


before(function setUser () {
    cy.loginPortalByApi()
  })


  describe('JWT', () => {
    it('is logged in', () => {
      var expectedList = ["Start","Let’s practice!"]
      expectedList.forEach(element => {
      cy.checkElementPresent(element)
      });
      
    })
  })

/*
    describe means test suite
    context means describe alias
    it means test case
*/

describe('EF portal login page custom commands',function(){

    const expectedResult ='Progress Test'

    context('EF portal login',function(){
        for(const user of testLoginUser){
            it(user.summary,function(){
                cy.loginPortalByUI(user.username, user.password)
                cy.checkElementPresent(expectedResult)
            })
        }
    })
})

describe('Loading test data by fixture', () => {
    it('loads', () => {
        cy.fixture('users').then((json) => {
            debugger
            console.log(json)
            for (const user of json) {
                cy.loginPortalByUI(user.username,user.password)
            }
          })
    })
  })

