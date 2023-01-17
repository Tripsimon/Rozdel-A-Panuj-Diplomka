const express = require('express')

const router = express.Router()

// DB Model
const EquipmentModel = require('../models/EquipmentModel.js');

router.get("/", (req, res) => {
    res.send("Strom výbavy");
})

router.post('/createWeapon',(req,res) =>{

    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        pruraznost: req.body.pierce,
        poskozeni: req.body.damage,
        vaha: req.body.weight,
        poznamka: null,
    })

    newItem.save()
        .then( res.send("Uspesne zapsano"))
})

router.post('/createWeapon',(req,res) =>{

    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        pruraznost: req.body.pierce,
        poskozeni: req.body.damage,
        vaha: req.body.weight,
        poznamka: null,
    })

    newItem.save()
        .then( res.send("Uspesne zapsano"))
})

router.post('/createArmor',(req,res) =>{

    console.log(req.body)

    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        obrana: req.body.obrana,
        vaha: req.body.weight,
        poznamka: null,
    })

    newItem.save()
        .then( res.send("Uspesne zapsano"))
})

router.post('/createItem',(req,res) =>{

    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        vaha: req.body.weight,
        poznamka: null,
    })

    newItem.save()
        .then( res.send("Uspesne zapsano"))
})

router.get('/all', (req,res) =>{
    EquipmentModel.find()
        .then(queryResult => res.send(queryResult))
})

module.exports = router
