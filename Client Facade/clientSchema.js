const mongoose = require('mongoose');

const client_schema = new mongoose.Schema({
    client:{
        type:String,
        required:true
    },
    description:{
        type: String
    },
    client_ID:{
        type:String
    },
    secretKey:{
        type:String
    }
},
    {timestamps:true}
);

module.exports = mongoose.model('CLIENT',client_schema);