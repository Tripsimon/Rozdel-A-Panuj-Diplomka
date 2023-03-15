const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

// DB Model
const RaceModel = require('../models/RaceModel.js');

router.get("/", (req, res) => {
    res.send("Strom ras");
})

router.get('/dump', (req,res) =>{
    RaceModel.find()
        .then(queryResponse =>     res.send(queryResponse))
})


module.exports = router
