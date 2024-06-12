const kafka = require('kafka-node');
const kafkaConfig={
    kafkaServer:'localhost:9092',
    topic:'notif',
}
const client=new kafka.KafkaClient({kafkaHost:kafkaConfig.kafkaServer});
const producer = new kafka.Producer(client);

const emailMessage = {
    to: 'pranjalarora98@gmail.com',
    subject: 'Test Haloo peep',
    text: 'Haloo peeps!'
};

// Send email message to Kafka topic
const payloads = [{
    topic: 'emails',
    messages: JSON.stringify(emailMessage)
}];

producer.on('ready',()=>{
    console.log('Kafka Producer ready');
})

producer.on('errror',()=>{
    console.log('error in producer');
})

function sendNotification(message) {
    // const payloads = [
    //     {
    //         topic: 'notif',
    //         messages: JSON.stringify(message)
    //     }
    // ];
    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Error occurred while sending notification:', err);
        } else {
            console.log('Notification sent successfully:', data);
        }
    });
}

module.exports = sendNotification;