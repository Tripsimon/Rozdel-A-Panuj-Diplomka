//Importy
const express = require('express')
const bcrypt = require("bcrypt")

//Router
const router = express.Router()

//DB Model
const RaceModel = require('../models/RaceModel.js');

//Kontrola funkce
router.get("/", (req, res) => {
    res.send("Strom ras");
})

/**
 * Routa, která vrátí všechny rasy v DB
 */
router.get('/dump', (req,res) =>{
    RaceModel.find()
        .then(queryResponse =>  res.send(queryResponse))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení všech ras:', error)
        })
})

//Export
module.exports = router
