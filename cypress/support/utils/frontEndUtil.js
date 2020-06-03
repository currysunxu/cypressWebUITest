// import jwt_decode from 'jwt-decode';

export function decodeJwtToVersionThree(jwtToken) {
    // var decoded = jwt_decode(token);
    // console.log(decoded);
    // return decoded; // The function returns v3 token by jwt
  debugger
  var base64Payload = jwtToken.split('.')[1];
  var payload = Buffer.from(base64Payload, 'base64');
  console.log("payload:- ", JSON.parse(payload));
  console.log("tokens:- ",  JSON.parse(payload).tokens[1])
  //TODO maybe refactor token by where ?(@version==3) instead of array[index]
  return JSON.parse(payload).tokens[1]
  }

  export function setLocalStorage (key,lcValue) {
    cy.visit('/', {
      onBeforeLoad (win) {
        // and before the page finishes loading
        // set the user object in local storage
        win.localStorage.setItem(key, lcValue)
      },
    })
  }
