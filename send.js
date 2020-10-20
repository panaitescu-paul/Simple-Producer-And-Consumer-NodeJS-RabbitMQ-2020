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
        var msg = 'Hello World!';
        const student = {
            firstName: "Paul",
            lastName: "Panaitescu",
            age: 24,
            message: "Experimenting with RabbitMQ"
        }

        channel.assertQueue(queue, {
            durable: false
        });
        // channel.sendToQueue(queue, Buffer.from(msg));
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(student)));

        // console.log(" [x] Sent %s", msg);
        console.log(" [x] Sent %s", JSON.stringify(student));
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
