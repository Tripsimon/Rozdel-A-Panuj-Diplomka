const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

// DB Model
const ClassModel = require('../models/ClassModel.js');

router.get("/", (req, res) => {
    res.send("Strom tříd");
})

router.get('/getByName', (req,res) =>{
    console.log(req.query.name)
    ClassModel.findOne({jmeno: req.query.name})
        .then(queryResponse => res.send(queryResponse))
})



module.exports = router
