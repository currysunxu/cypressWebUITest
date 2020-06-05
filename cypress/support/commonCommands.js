import {decodeJwtToVersionOne, decodeJwtToVersionThree, setLocalStorage} from "./utils/frontEndUtil"
import { testPortal } from '../integration/testData/testPortal.data'

// ***********************************************
// This commondCommand.js shows you how to
// create common custom commands 
//
// For more comprehensive examples of custom
// commands please read more here:

Cypress.Commands.add('loginPortalByUI', (username, password) => {
    cy.visit('/')
    cy.get('[type=text]').type(username)
    cy.get('[type=password]').type(password)
    cy.contains('登录').click()
  })
  

Cypress.Commands.add('loginPortalByApi', () => {
    console.log("test"+Cypress.config('auth_api_server'))
    var authServer = Cypress.config('auth_api_server')
    var userName =  Cypress.env('username')
    var password = Cypress.env('password')
    cy.request('POST', authServer, {
      "userName": userName,
      "password": password,
    })
    .its('body.idToken')
    .then((jwtToken) => {
        constructPortalStorage(jwtToken)
        setLocalStorage('portal',JSON.stringify(testPortal))
    })
})

Cypress.Commands.add('openNewWindowByVersionOneToken',()=>{
    cy.window().then((window) =>{
        debugger
        console.log("version1:",JSON.parse(window.localStorage.getItem('portal')).version1)
        var versionOneToken = JSON.parse(window.localStorage.getItem('portal')).version1
        var newWindowUrl =Cypress.config('hf_study_url')+versionOneToken
        console.log(newWindowUrl)
        cy.visit(newWindowUrl)
    })
})

function constructPortalStorage(jwtToken) {
    testPortal.XEFTOKEN = jwtToken
    testPortal.version1 = decodeJwtToVersionOne(jwtToken)
    testPortal.version3 = decodeJwtToVersionThree(jwtToken)
}



