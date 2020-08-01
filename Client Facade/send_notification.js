const Notification = require('../models/notificationMessage');
const { DispatchNotification } = require('route');

function Post_notification(req,res){
    
    const message = new Notification({
        client_ID : req.body.client_ID,
        usernames : req.body.usernames,
        message : req.body.message
    })

    console.log(message);
    //call notification dispatcher
    DispatchNotification(client_ID, usernames, message);

}

module.exports={
    Post_notification
};