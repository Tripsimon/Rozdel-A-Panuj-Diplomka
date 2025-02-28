//Importy
const express = require('express')
const bcrypt = require("bcrypt")

//Router
const router = express.Router()

//DB Model
const ClassModel = require('../models/ClassModel.js');

/**
 * Kontrola funkcionality
 */
router.get("/", (req, res) => {
    res.send("Strom tříd");
})


router.get('/getMultipleByID', (req, res) => {
    console.log(req.query)
    ClassModel.find({ _id: [('67c1ab9cf6d2fd2c1e544cb1')] })
        .then((response) => {
            console.log(response)
            res.send("YEET")
        })
})
/**
 * Routa pro vrácení třídy
 */
router.get('/getByName', (req, res) => {
    ClassModel.findOne({ jmeno: req.query.name })
        .then(queryResponse => res.send(queryResponse))
})



module.exports = router
