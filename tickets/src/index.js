const CreateTicket = require('../src/routes/create-ticket');

const express = require('express');

const app = express();

app.use(CreateTicket);

app.listen(3003,()=>{
    console.log('Ticket service running');
})