const mongoose = require('mongoose');
const CLIENT = require('../models/clientSchema');
const uniqid = require('uniqid');
const crypto = require('crypto');

//secret key generation for registering client
function SecretKey(ID)
{
    var key=crypto.createHash('sha256').update(ID + 'Secretkey@123').digest('hex');
    return(key);
}


//taking input credentials from client using json format
function Post_client(req,res){

mongoose.connect('mongodb://localhost:27017/clientCredentials',{useNewUrlParser : true, useUnifiedTopology : true})
    .then(()=>{
        console.log("Database connection established");
    });

mongoose.connection.on('error',function(){
    console.log("Error occurred");
});

    const new_client = new CLIENT();
    new_client.client = req.body.client;
    new_client.description = req.body.description;
    

    //to check if client already exists otherwise register a new client
    CLIENT.countDocuments({client : new_client.client},function(err,count){
        if(count>0)
        res.send('Client already exists');
        else
        {
            const clientid = uniqid('application-');
            const key = SecretKey(clientid);
 
            new_client.client_ID = clientid;
            new_client.secretKey = key;

        new_client.save(function(err,CLIENT){
            if(err)
            res.send('Error occurred registering client!');
            else
            res.send(new_client);
        })
        }
    })
    
}

module.exports={
    Post_client
};