const axios=require('axios');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

var jsw_token=require('./jwt_construct.js');
var logging=require('./logging.js');
var produceRabbitmqMessage=require('./Rabbitmqpush.js')


function get_collapseId(device_token,message)
{
	var hashPwd = crypto.createHash('sha256').update(device_token+message).digest('hex'); 
	return hashPwd;
}

var authorizationtoken=jsw_token.token_generator(keyID,teamID);

setTimeout(function()
{
    authorizationtoken=jsw_token.token_generator(keyID,teamID);
},3600000)

function sendpostRequest(device_token,message)
{
    axios
    (
        {
            method:'post',
            url:'https://api.sandbox.push.apple.com:443',
            headers:
            {
                'method':POST,
                'authorization':`bearer ${authorizationtoken}`,
                'path':`/3/device/${device_token}`,
                'apns-id':uuidv4(),
                'apns-push-type':alert,
                'apns-expiration':0,
                'apns-priority':10,
                'apns-topic':'com.example.MyApp',
                'apns-collapse-id':get_collapseId(device_token,message)
            },
            data:JSON.stringify
            (
                {
                    "aps" : { "alert" : message } 
                }
            )

        }

    ).then(function(response)
        {
            logging.store(device_token,message,response.headers.apns-id);
        })
     .catch(function(error)
        {
            if(error.response.data.reason==='BadDeviceToken')
            {
                produceRabbitmqMessage.produce_RabbitMQ(device_token,error.response.data.reason);
            }
            else if(error.response.data.reason==='Unregistered')
            {
                produceRabbitmqMessage.produce_RabbitMQ(device_token,error.response.data.reason);
            }
            else if(error.response.data.reason==='Expired Provider Token')
            {
                authorizationtoken=auth.token_generator(keyID,teamID);
            }
            return [device_token,message,error.response];
        })

}

module.exports={sendpostRequest};