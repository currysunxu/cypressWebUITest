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
    cy.contains('登录').click()
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

Cypress.Commands.add('window_open', (text) => {
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen')
    })
    cy.contains(text).click()
    cy.get('@windowOpen').should('be.called');
})

function parseUrlByWindow(window, localStorageKey, url) {
    console.log("version:", JSON.parse(window.localStorage.getItem('portal')))
    var localVersion = JSON.parse(window.localStorage.getItem('portal'))
    var token = localStorageKey === 'version1' ? localVersion.version1 :
    localStorageKey === 'version3' ? localVersion.version3 : localVersion.XEFTOKEN
    var newWindowUrl = Cypress.config(url) + token
    if (url.indexOf('gp') !=- 1) {
        newWindowUrl = newWindowUrl + "&userId=" + localVersion.userid + "&englishFirstName=" + localVersion.userName
            + "&marketRegion=" + localVersion.marketRegion
    }
    return newWindowUrl
}

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
            "Realm": Cypress.config('baseUrl').split('//')[1],
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
            cy.visit('/')
        })
})


