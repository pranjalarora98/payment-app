const kafka = require('kafka-node');
const kafkaConfig={
    kafkaServer:'localhost:9092',
    topic:'notif',
}

const client = new kafka.KafkaClient({kafkaHost:'localhost:9092'});
const consumer = new kafka.Consumer(client,[{ topic: kafkaConfig.topic, partition: 0 }])

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Update with your SMTP server host
    port: 587,
    secure: false, // Set to true if your SMTP server requires SSL
    auth: {
        user: 'your_username',
        pass: 'your_password'
    }
});


consumer.on('notif',()=>{
    console.log('message recieved successfully');
    const emailMessage = JSON.parse(message.value);
    console.log('Received email message:', emailMessage);

    transporter.sendMail(emailMessage, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
})