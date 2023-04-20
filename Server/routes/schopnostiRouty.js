//Importy
const express = require('express')
const bcrypt = require("bcrypt")

//Router
const router = express.Router()

//DB Model
const AbilityModel = require('../models/AbilityModel');

//Kontrola funkcionality
router.get("/", (req, res) => {
    res.send("Strom schopností");
})

//Routa pro vrácení všech dat schopností
router.get("/dump", (req,res) =>{
    AbilityModel.find()
        .then(queryResponse => res.send(queryResponse))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení všech dat schopností:', error)
        })
})




//Routa, která vrát jednu schopnost podle ID
router.get("/getByID",(req,res) =>{
    AbilityModel.findOne({'_id': req.query.id})
        .then(queryResponse => res.send(queryResponse) )
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení jedné schopnosti:', error)
        })
    
})

//Routa, která vrátí více schopností 
router.get('/getMultipleByID', (req,res) =>{
    AbilityModel.find({_id: {$in: req.query.abilities}})
        .then(queryResponse => res.send(queryResponse))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení jedné schopnosti:', error)
        })
})

//Routa, která vrátí schopnosti podle majitele
router.get('/getByOwner', (req,res) =>{
    AbilityModel.find({majitel: req.query.owner})
        .then(queryResponse => res.send(queryResponse))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení dat schopností podle majitele:', error)
        })

})


module.exports = router
