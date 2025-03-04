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
    ClassModel.find({ _id: {$in: req.query.classes} })
        .then((queryResponse) => {
            res.send(queryResponse)
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
