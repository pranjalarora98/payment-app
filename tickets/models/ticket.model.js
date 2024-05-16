const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    images:{type:Array},
    raisedBy:{type:Object,required:true},
    assignedTo:{type:Object,required:true},
    status:{type:String,required:true},
    priority:{type:String},
    comments:{type:Array},
    createdAt:{type:Date},
    agent:{type:String}
})

const Ticket = mongoose.model('Ticket',ticketSchema);

module.exports = Ticket;