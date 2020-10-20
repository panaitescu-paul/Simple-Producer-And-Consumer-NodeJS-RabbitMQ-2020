#!/usr/bin/env node

// npm install readline-sync

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
        const readline = require('readline-sync');
        let name = readline.question("What is your Name? ");
        let email = readline.question("What is your Email? ");
        let phone = readline.question("What is your Phone? ");
        let address = readline.question("What is your Address? ");

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(queue));
        channel.sendToQueue(queue, Buffer.from("Name: " + name));
        channel.sendToQueue(queue, Buffer.from("Email: " + email));
        channel.sendToQueue(queue, Buffer.from("Phone: " + phone));
        channel.sendToQueue(queue, Buffer.from("Address: " + address));

        console.log(" [x] Sent ");
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
