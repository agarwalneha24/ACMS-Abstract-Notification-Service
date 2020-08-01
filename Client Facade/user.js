const mongoose = require('mongoose');
const CLIENT = require('../models/clientSchema');
const USER = require('../models/userSchema');


function Post_user(req,res){
    
    mongoose.connect('mongodb://localhost:27017/userCredentials',{useNewUrlParser : true, useUnifiedTopology : true})
    .then(()=>{
        console.log("Database connection established");
    });
    
    mongoose.connection.on('error',function(){
        console.log("Error occurred connecting with database");
    });

    

    const new_user = new USER({
        username : req.body.username,
        DeviceToken : req.body.DeviceToken,
        deviceID : req.body.deviceID,
        OStype : req.body.OStype,
        client_ID : req.body.client_ID
    });


    //check if user exists
    USER.countDocuments({username : new_user.username},function(err,count){
        if(count>0)
        {
            //check if device is already registered
            USER.countDocuments({deviceID : new_user.deviceID},function(err,count){
                if(count>0)
                {
                    //device token updated for registered user
                    USER.findOneAndUpdate({username : new_user.username, deviceID : new_user.deviceID},{$set:{DeviceToken : new_user.DeviceToken}},
                        {new:true, upsert:true, useFindAndModify:false},function(err,new_user){
                            if(err)
                            {
                                res.send("Error occurred updating user's credentials!");
                            }
                            else
                            {
                                console.log(new_user);
                                res.send("User credentials successfully updated!");
                            }
                        })
                }
                else
                {
                    //registration of new device
                    new_user.save(function(err,USER){
                        if(err)
                        {
                            res.send("Error ocurred creating new user's device entry!");
                        }
                        else 
                        {
                            console.log(new_user);
                            res.send("New device registered!");
                        }
                    })
                }
            });
        }
        else
        {
            //registration of new user
            new_user.save(function(err,USER){
                if(err)
                {
                    res.send("Error occurred creating user entry!");
                }
                else
                {
                    console.log(new_user);
                    res.send("New user registered!");
                }
            });
            
        }
    });
}
    

module.exports={
    Post_user
};