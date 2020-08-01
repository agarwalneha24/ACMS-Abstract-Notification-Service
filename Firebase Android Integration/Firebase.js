var admin = require("firebase-admin");

var serviceAccount = require("../firebase/precise-mystery-243323-firebase-adminsdk-c7b1a-d99b2c77af.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://precise-mystery-243323.firebaseio.com"
});

async function sendMessage(notificationPayload, deviceToken) {
    var message = {
        data: notificationPayload,
        token: deviceToken
    };

    return admin.messaging().send(message)
        .then((response) => {
            return {
                "status": "OK",
                "response": response,
                "token":message.token,
                "payload": message.data
              };
        })
        .catch((error) => {
            return {
                "status": "ERR",
                "response": error,
                "token":message.token,
                "payload": message.data
            };
        });
}

module.exports = { sendMessage };