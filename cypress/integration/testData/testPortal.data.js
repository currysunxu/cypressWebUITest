//ToDo dynamically fetch data by corresponding API,like get from product api and basic api
import {decodeJwtToVersionOne, decodeJwtToVersionThree} from "../../support/utils/frontEndUtil";

export const testPortal={
    "XEFTOKEN":"",
    "version1":"",
    "version3":"",
    "userid":"",
    "marketRegion":1,
    "market":"",
    "userName":"",
    "state":"",
    "exp":null,
    "curTime":null,
    "birthday":"",
    "grade":"",
    "isBroadcast":true,
    "ocValue":"",
    "studentType":""
}

export function buildTestPortal(jwtToken) {
    testPortal.XEFTOKEN = jwtToken
    testPortal.version1 = decodeJwtToVersionOne(jwtToken)
    testPortal.version3 = decodeJwtToVersionThree(jwtToken)
}