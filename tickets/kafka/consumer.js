const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.TRANSPORTER_EMAIL,
        pass: process.env.TRANSPORTER_PASSWORD,
    },
});

const kafka = new Kafka({
    clientId: 'Digest-app',
    brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'digest-email-group' });

async function consume() {
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.TOPIC });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const ticketData = JSON.parse(message.value.toString());

            // Send email notification
            const emailContent = {
                to: 'recipient@example.com', // Replace with actual recipient email
                subject: 'New Ticket Created',
                text: `A new ticket has been created with details: ${JSON.stringify(ticketData)}`,
            };

            try {
                await transporter.sendMail(emailContent);
                console.log('Email notification sent successfully');
            } catch (error) {
                console.error('Error sending email notification:', error);
            }
        },
    });
}

consume().catch((error) => {
    console.error('Error consuming Kafka messages:', error);
});

module.exports = consume;
