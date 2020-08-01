const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    client_ID:{
        type:String,
        required:true
    },
    usernames:{
        type:Array,
        required:true
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model('Notification',messageSchema);

