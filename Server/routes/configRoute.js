//Importy
const express = require('express')

//Router
const router = express.Router()

// DB Model
const ConfigSchema = require('../models/ConfigModel.js');

/**
 * Kontrola funkce
 */
router.get("/", (req, res) => {
    res.send("Strom konfigurace");
})

/**
 * Navrátí config data
 */
router.get('/get', (req,res) =>{
    ConfigSchema.findOne({typ:req.query.typ})
        .then(queryResponse =>  res.send(queryResponse.hodnota))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení dat z konfigurace:', error)
        })
})

//Export
module.exports = router
