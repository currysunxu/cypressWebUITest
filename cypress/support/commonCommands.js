/// <reference types="cypress" />

import { decodeJwtToVersionOne, decodeJwtToVersionThree, setLocalStorage } from "./utils/frontEndUtil"
import { testPortal,buildTestPortal } from '../integration/testData/testPortal.data'

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
    cy.get('*[class^=" c-operation__btn"]').click({force:true})
})

Cypress.Commands.add('loginPortalByApi', (userName,password) => {
    console.log("test" + Cypress.config('auth_api_server'))
    var authServer = Cypress.config('auth_api_server')
    cy.request('POST', authServer, {
        "userName": userName,
        "password": password,
    })
        .its('body.idToken')
        .as('jwtToken')
})

Cypress.Commands.add('loginPortalByApiAndSetLocalStorage', (userName,password) => {
    cy.loginPortalByApi(userName,password)
    .then((jwtToken) => {
        buildTestPortal(jwtToken)
        setLocalStorage('portal', JSON.stringify(testPortal))
    })
})

Cypress.Commands.add('openNewWindowByLocalStorage', (url, localStorageKey) => {
    // cy.server()
    // cy.route('**/basic').as('getBasic')
    // cy.wait('@getBasic')
    cy.window().then((window) => {
        var newWindowUrl = parseUrlByWindow(window, localStorageKey, url)
        cy.visit(newWindowUrl)
    })
})

Cypress.Commands.add('window_open', (text, type) => {
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen')
    })
    // find element by text
    if (type == "text") {
        cy.contains(text).click({force:true})
    }
    // find element by class
    else if (type == "class") {
        cy.get('*[class^="' + text + '"]').click({force:true})
    }
    cy.get('@windowOpen').should('be.called');
})

function parseUrlByWindow(window, localStorageKey, url) {
    console.log("version:", JSON.parse(window.localStorage.getItem('portal')))
    var localVersion = JSON.parse(window.localStorage.getItem('portal'))
    var token = localStorageKey === 'version1' ? localVersion.v1Token :
    localStorageKey === 'version3' ? localVersion.v3Token : localVersion.idToken
    var newWindowUrl = Cypress.config(url) + token
    if (url.indexOf('gp') !=- 1) {
        newWindowUrl = newWindowUrl + "&userId=" + localVersion.userid + "&englishFirstName=" + localVersion.userName
            + "&marketRegion=" + localVersion.marketRegion
    }
    return newWindowUrl
}


