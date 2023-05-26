const express = require("express");
const router=express.Router();
const User=require('../model/user.model');

router.get('/',(req,res)=>{
    res.send('Hello World!')
})

//post


module.exports=router