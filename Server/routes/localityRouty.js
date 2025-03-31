//Importy
const express = require('express')

//Router
const router = express.Router()

// DB Model
const LocalitySchema = require('../models/LocalityModel.js');

/**
 * Kontrola funkce
 */
router.get("/", (req, res) => {
    res.send("Strom lokalit");
})

/**
 * Navrátí config data
 */

//Export
module.exports = router
