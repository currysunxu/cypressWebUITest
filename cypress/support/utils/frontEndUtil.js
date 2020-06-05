// import jwt_decode from 'jwt-decode';

import {testPortal} from "../../integration/testData/testPortal.data";

export function decodeJwtToVersionThree(jwtToken) {
    // var decoded = jwt_decode(token);
    // console.log(decoded);
    // return decoded; // The function returns v3 token by jwt
    debugger
    var base64Payload = jwtToken.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    debugger
    console.log("payload:- ", JSON.parse(payload));
    console.log("value:- ", JSON.parse(payload).tokens[1].value);
    //TODO maybe refactor token by where ?(@version==3) instead of array[index]
    return JSON.parse(payload).tokens[1].value
}

export function decodeJwtToVersionOne(jwtToken) {
    // var decoded = jwt_decode(token);
    // console.log(decoded);
    // return decoded; // The function returns v1 token by jwt
    debugger
    var base64Payload = jwtToken.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    debugger
    console.log("payload:- ", JSON.parse(payload));
    console.log("value:- ", JSON.parse(payload).tokens[1].value);
    //TODO maybe refactor token by where ?(@version==1) instead of array[index]
    return JSON.parse(payload).tokens[0].value
}

export function setLocalStorage(key, lcValue) {
    cy.visit('/', {
        onBeforeLoad(win) {
            // and before the page finishes loading
            // set the user object in local storage
            win.localStorage.setItem(key, lcValue)
        },
    })
}

export function getTokenFromAuth(authServer,userName,password){
    cy.request('POST', authServer, {
        "userName": userName,
        "password": password,
    })
        .its('body.idToken')
        .then((jwtToken) => {
            return jwtToken
        })
}
