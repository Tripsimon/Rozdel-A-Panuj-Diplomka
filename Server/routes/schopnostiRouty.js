const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

// DB Model
const AbilityModel = require('../models/AbilityModel');

router.get("/", (req, res) => {
    res.send("Strom schopností");
})

router.get("/dump", (req,res) =>{
    AbilityModel.find()
        .then(queryResponse => res.send(queryResponse))
})

router.get("/byOwner",(req,res) =>{
    AbilityModel.find({'owner': req.query.owner})
        .then(queryResponse => res.send(queryResponse) )
    
})


module.exports = router
