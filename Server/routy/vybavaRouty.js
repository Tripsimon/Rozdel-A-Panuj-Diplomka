const express = require('express')

const router = express.Router()

// DB Model
const EquipmentModel = require('../models/EquipmentModel.js');

router.get("/", (req, res) => {
    res.send("Strom výbavy");
})

/**
 * Vytvoří nový předmět který je zbran
 */
router.post('/createWeapon',(req,res) =>{

    console.log(req.body)
    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        schopnosti: req.body.abilities,
        pruraznost: req.body.pierce,
        poskozeniZaklad: req.body.damageBase,
        poskozeniZavaznost: req.body.damageSeverity,
        vaha: req.body.weight,
        poznamka: null,
    })

    console.log("Předmět",newItem)
    newItem.save()
        .then( res.send("Uspesne zapsano"))
})

/**
 * Vytvoří předmět, který je zbroj
 */
router.post('/createArmor',(req,res) =>{

    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        schopnosti: req.body.abilities,
        obrana: req.body.obrana,
        vaha: req.body.weight,
        poznamka: null,
    })

    newItem.save()
        .then( res.send("Uspesne zapsano"))
})

/**
 * Vytvoří předmět
 */
router.post('/createItem',(req,res) =>{

    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        schopnosti: req.body.abilities,
        vaha: req.body.weight,
        poznamka: null,
    })

    newItem.save()
        .then( res.send("Uspesne zapsano"))
})

router.get('/removeItem',(req,res)=>{
    EquipmentModel.findByIdAndDelete({_id: req.query.itemID})
        .then(queryResponse =>{
            res.send(queryResponse)
        })
})

/**
 * Vrátí všechny předměty jednoho typu
 * Zran, Zbroj, Předmět
 */
router.get('/allType', (req,res) =>{
    EquipmentModel.find({typ: req.query.type})
        .then(queryResult => res.send(queryResult))
})

/**
 * Vrátí pole předmětů podle zadaného pole ID
 * 
 */
router.get('/multipleID', (req,res) =>{
    console.log(req.query)
    EquipmentModel.find({_id: {$in: req.query.items} })
        .then(queryResult => {
            res.send(queryResult);
            console.log(queryResult)
        })
})


module.exports = router
