import { decodeJwtToVersionOne, decodeJwtToVersionThree, setLocalStorage } from "./utils/frontEndUtil"
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
    console.log("test" + Cypress.config('auth_api_server'))
    var authServer = Cypress.config('auth_api_server')
    var userName = Cypress.env('username')
    var password = Cypress.env('password')
    cy.request('POST', authServer, {
        "userName": userName,
        "password": password,
    })
        .its('body.idToken')
        .then((jwtToken) => {
            constructPortalStorage(jwtToken)
            setLocalStorage('portal', JSON.stringify(testPortal))
        })
})

Cypress.Commands.add('openNewWindowByToken', (url, value) => {
    cy.wait(3000)
    cy.window().then((window) => {
        console.log("version:", JSON.parse(window.localStorage.getItem('portal')))
        var localVersion = JSON.parse(window.localStorage.getItem('portal'))
        var token = value === 'version1' ? localVersion.version1 :
            token === 'version3' ? localVersion.version3 : localVersion.XEFTOKEN
        var newWindowUrl = Cypress.config(url) + token
        cy.visit(newWindowUrl)
    })
})

Cypress.Commands.add('window_open', (text) => {
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen')
    })
    cy.contains(text).click()
    cy.get('@windowOpen').should('be.called');
})

function constructPortalStorage(jwtToken) {
    testPortal.XEFTOKEN = jwtToken
    testPortal.version1 = decodeJwtToVersionOne(jwtToken)
    testPortal.version3 = decodeJwtToVersionThree(jwtToken)
}



