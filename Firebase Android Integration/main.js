const mongo = require("./Mongo");
const rabbitMQ = require("./RabbitMQ");
const firebase = require("./Firebase");



function isSuccessful(response) {
    return response.status === "OK";
}

function createNotificationArray(param) {

    var retarr = [];

    if (Array.isArray(param)) {

        param.forEach(obj => {

            if ((typeof (obj) === 'object') && (obj.payload != undefined) && (obj.token != undefined)) {
                retarr.push({ payload: obj.payload, token: obj.token });
            }

        });

    } else if ((typeof (param) === 'object') && (param.payload != undefined) && (param.token != undefined)) {

        if (Array.isArray(param.token) && Array.isArray(param.payload)) {

            param.token.forEach(token => {
                param.payload.forEach(payload => {
                    retarr.push({ payload: payload, token: token });
                });
            });

        } else if (Array.isArray(param.token)) {

            param.token.forEach(token => {
                retarr.push({ payload: param.payload, token: token });
            });

        } else if (Array.isArray(param.payload)) {

            param.payload.forEach(payload => {
                retarr.push({ payload: payload, token: param.token });
            });

        } else {

            retarr.push({ payload: param.payload, token: param.token });

        }
    }
    return retarr;
}


/*  details can have following structure:
    [ { payload: string, token: string }, ... ]             for distinct pairs of payloads and device tokens
    { payload: string, token: string }                      for a single pair of payload and device token
    { payload: string, token: [ string, ... ] }             for a single payload to a list of device tokens
    { payload: [ string, ... ], token: string }             for multiple payloads to a single device token
    { payload: [ string, ... ], token: [ string, ... ] }    for multiple payloads to a list of device tokens */
function main(details) {

    var arr = createNotificationArray(details);

    arr.forEach(async (obj) => {

        var response = await firebase.sendMessage(obj.payload, obj.token);

        if (isSuccessful(response)) {
            mongo.saveLogEntry(response);
        } else {
            rabbitMQ.sendMessage(response);
        }

    });

}

module.exports = { main };