//Importy
const express = require('express')

//Router
const router = express.Router()

//DB Model
const EquipmentModel = require('../models/EquipmentModel.js');

//Kontrola funkcionality
router.get("/", (req, res) => {
    res.send("Strom výbavy");
})

/**
 * Routa pro vytboření nové zbraně
 */
router.post('/createWeapon',(req,res) =>{
    let newItem = new EquipmentModel({
        name: req.body.name,
        typ: req.body.type,
        description: req.body.description,
        abilities: req.body.abilities,
        pierce: req.body.pierce,
        damageBase: req.body.damageBase,
        damageSeverity: req.body.damageSeverity,
        weight: req.body.weight,
        deletable: true,
    })
    newItem.save()
        .then( res.send("Item Created"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vytváření nové zbraně:', error)
        })
})

/**
 * Routa pro vytvoření nové zbroje
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
        mazatelnost: true,
    })

    newItem.save()
        .then( res.send("Item Created"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vytváření nové zbroje:', error)
        })
})

/**
 * Routa pro vytvoření nového předmětu
 */
router.post('/createItem',(req,res) =>{

    let newItem = new EquipmentModel({
        jmeno: req.body.name,
        typ: req.body.type,
        popis: req.body.description,
        schopnosti: req.body.abilities,
        vaha: req.body.weight,
        poznamka: null,
        mazatelnost: true,
    })

    newItem.save()
        .then( res.send("Item Created"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vytváření nového předmětu:', error)
        })
})

/**
 * Routa pro smazání jednoho předmětu
 */
router.get('/removeItem',(req,res)=>{
    EquipmentModel.findByIdAndDelete({_id: req.query.itemID})
        .then(queryResponse =>{
            res.send("Item Deleted")
        })
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při odebrání předmětu z DB:', error)
        })
})

/**
 * Routa pro vrácení všech předmětů jednoho typu
 * Zran, Zbroj, Předmět
 */
router.get('/allType', (req,res) =>{
    EquipmentModel.find({typ: req.query.type})
        .then(queryResult => res.send(queryResult))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vracení předmětu jednoho typu:', error)
        })
})

/**
 * Routa pro navácení více předmětů
 */
router.get('/multipleID', (req,res) =>{
    EquipmentModel.find({_id: {$in: req.query.items} })
        .then(queryResult => {
            res.send(queryResult);
        })
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení více předmětů:', error)
        })
})

//Export
module.exports = router
