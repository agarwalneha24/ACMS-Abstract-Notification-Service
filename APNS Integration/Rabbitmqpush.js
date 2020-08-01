const amqp = require('amqplib/callback_api');

function produce_RabbitMQ(device_token,error)
{
    amqp.connect('amqp://rimika:rimika123@206.189.134.92:5672//', (connError, connection) => {
    if (connError) {
    }
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        const QUEUE = 'Invalid Device tokens'
        var details_arr={"device_token":device_token,"error":error};
        var arr=JSON.stringify(details_arr);
        channel.assertQueue(QUEUE);
        channel.sendToQueue(QUEUE, Buffer.from(arr));
        console.log(`Message send ${QUEUE}`);
    })
    })
}
produce_RabbitMQ("Token123","Unregistered");
module.exports={produce_RabbitMQ};
