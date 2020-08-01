
var mongoose = require('mongoose');
const iosdata = require('./main.js');             //APNS INTEGRATION
const androiddata = require('./mains.js');       //FIREBASE ANDROID INTEGRATION
const express = require('express');
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://206.189.134.92/my_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successful");
});

mongoose.connection.on('error', function () {
    console.log('error cannot establish connection');
});

var messagenotification;

function DispatchNotification(client_id, usernames, message) {         //CLIENT FACADE
    var arr = [client_id, usernames, message];
    messagenotification = message;
};

app.get('207.189.134.92', (req, res) => {

    USER.find({ 'OStype': 'iOS' }).DeviceToken.toArray()
        .then(results => {
            var details = {
                message: 'messagenotification',
                DeviceToken: 'results'
            }
            iosdata(details);      //IOS DEVICES
        })

        .catch(error => {
            console.log(error);
        })


    USER.find({ 'OStype': 'Android' }).DeviceToken.toArray()
        .then(results => {
            var details2 = {
                message: 'messagenotification',
                DeviceToken: 'results'
            }
            androiddata(details2);                //ANDROID DEVICES
        })

        .catch(error => {
            console.log(error);
        })

})
console.log("notificaion message sent by Dispatcher");

module.exports = DispatchNotification;
