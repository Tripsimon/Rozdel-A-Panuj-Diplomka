//Importy
const express = require('express')
const bodyParser = require('body-parser')

//Router
const router = express.Router()
router.use(bodyParser.json())

// DB Model
const MonsterModel = require('../models/MonsterModel.js')

//Kontrola funkce
router.get("/", (req, res) => {
    res.send("Router monster")
})

/**
 * Routa pro vytvoření nového monstra
 */
router.post('/createMonster', (req, res) => {
    let newMonster = new MonsterModel({

        name: req.body.name,
        description: req.body.description,
        typ: req.body.type,
        abilities: req.body.abilities,

        strength: req.body.strength,
        constitution: req.body.constitution,
        agility: req.body.agility,
        charisma: req.body.charisma,
        inteligence: req.body.inteligence,
        knowledge: req.body.knowledge,

        armor: req.body.armor,
        life: req.body.life,

        pierce: req.body.pierce,
        damageBase: req.body.damageBase,
        damageSeverity: req.body.damageSeverity,

        sizeGroup: req.body.sizeGroup
    })

    console.log(req.body.abilities)


    newMonster.save()
        .then(res.send("Monster Created"))
        .catch(error => {
            console.log('Vyskytla se chyba při uložení monstra:', error)
        })
})

/**
 * Vrátí všechny monstra v databázi
 */
router.get("/dump", (req, res) => {
    MonsterModel.find()
    .then(queryResult => res.send(queryResult))
    .catch(error => {
        res.send('Error')
        console.log('Vyskytla se chyba při vrácení všech monster:', error)
    })

})

/**
 * Routa pro vrácení monster podle typu
 */
router.get('/byType', (req, res) => {
    MonsterModel.find({ 'typ': req.query.typ })
        .then(dbResponse => {
            res.send(dbResponse)
        })
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení monster podle typu:', error)
        })
})

/**
 * Routa pro smazání monstra
 */
router.delete("/removeMonster", (req, res) => {
    MonsterModel.deleteOne({ '_id': req.body.id })
        .then(res.send('Monster Deleted'))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při smazání monstra:', error)
        })
})

//Export
module.exports = router
