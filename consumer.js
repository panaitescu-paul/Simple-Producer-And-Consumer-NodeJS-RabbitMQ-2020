#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            let payload = JSON.parse(msg.content.toString());

            console.log(" [x] Received %s", msg.content.toString());

            console.log("The full name is: " +
                        payload.firstName + " " +
                        payload.lastName
                        );
            console.log("The age is not: " + (payload.age + 10));
            console.log("The message is: " + (payload.message));
        }, {
            noAck: true
        });
    });
});

