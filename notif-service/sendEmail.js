const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'ap-south-1', // e.g., 'us-east-1'
    accessKeyId: 'AKIATCKAM6FRNAX7DFXD',
    secretAccessKey: '19v5SF25WnGJOfHiOGt3ICPzIj2yandCemxEEEsv'
});

// Create SES service object
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// Function to send email using SES
function sendEmail(subject, body, recipient) {
    const params = {
        Destination: {
            ToAddresses: ['rohanb22250@gmail.com']
        },
        Message: {
            Body: {
                Text: {
                    Data: body
                }
            },
            Subject: {
                Data: subject
            }
        },
        Source: 'pranjalarora98@gmail.com'
    };

    return new Promise((resolve, reject) => {
        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.error('Error occurred while sending email:', err);
                reject(err);
            } else {
                console.log('Email sent successfully:', data);
                resolve(data);
            }
        });
    });
}

module.exports = sendEmail;
