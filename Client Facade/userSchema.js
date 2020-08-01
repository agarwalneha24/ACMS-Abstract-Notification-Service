const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    DeviceToken:{
        type:String,
        required:true
    },
    deviceID:{
        type:String,
        required:true
    },
    OStype:{
        type:String,
        required:true
    },
    client_ID:{
        type:String,
        required:true
    }
},
    {timestamps:true}
);

module.exports = mongoose.model('USER',user_schema);