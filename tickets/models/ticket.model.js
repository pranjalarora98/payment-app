const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    images:{type:Array},
    raisedBy:{type:Object},
    assignedTo:{type:Object},
    priority:{type:String},
    comments:{type:Array},
    createdAt:{type:Date},
    agent:{type:String},
    priority:{type:Number},
})

const Ticket = mongoose.model('Ticket',ticketSchema);

module.exports = Ticket;