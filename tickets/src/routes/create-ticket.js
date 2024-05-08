const express = require('express');
const app = express();
const {body,validationResult} = require('express-validator');
const router = express.Router();

const Ticket = require('../../models/ticket.model');

router.post('/ticket/create',async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,description} = req.body;
    const ticket = new Ticket({name,description});
    ticket.save();
    return res.status(200).json({msg:'Created Successfully'});
})

module.exports = router;