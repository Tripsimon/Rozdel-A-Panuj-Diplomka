//Importy
const express = require('express')

//Router
const router = express.Router()

// DB Model
const LocalityModel = require('../models/LocalityModel.js');

/**
 * Kontrola funkce
 */
router.get("/", (req, res) => {
    res.send("Strom lokalit");
})

router.post("/createLocality", (req,res) =>{
    console.log("Tvorba lokality")

    let newLocality = new LocalityModel({
        name: req.body.localityName,
        height: req.body.localityHeight,
        width: req.body.localityWidth,
        map: req.body.locality,
        owner: req.body.owner
    })
    newLocality.save()
    .then(() =>{
        res.send("Success")
    }).catch(() =>{
        console.log("Problem při tvorbě lokality")
    })
})

router.get("/getLocalities", (req,res) =>{
    LocalityModel.find()
    .then(payload =>{
        res.send(payload)
    })
})
/**
 * Navrátí config data
 */

//Export
module.exports = router
