const express = require('express');
const app = express();
const TicketModel = require('../../models/ticket.model');
const router = express.Router;
app.use(router);

router.put('/ticket/:id',(req,res)=>{
    const {ticketId,status} = req.body;
  const ticket = TicketModel.find({id:ticketId});
  if(!ticket){
    return res.status(500).send({msg:"Invalid Ticket Id"});
  }
   ticket.status=status;
})


module.exports = router;