const amqp = require('amqplib/callback_api');

async function sendMessage(response) {

    var message = {
        deviceToken: response.token,
        message: response.payload,
        date: Date(),
        error: response.status,
        notificationID: response.response
    };

    amqp.connect('amqp://localhost', function (connError, connection) {
        if (connError) {
            throw connError;
        }
        connection.createChannel(function (channelError, channel) {
            if (channelError) {
                throw channelError;
            }

            const queue = 'koshi';

            channel.assertQueue(queue);
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

            console.log(" [x] Sent %s", message);
        });

    });
};

module.exports = { sendMessage };