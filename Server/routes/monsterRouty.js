const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
router.use(bodyParser.json())

// DB Model
const MonsterModel = require('../models/MonsterModel.js')


router.get("/", (req, res) => {
    res.send("Router monster")
})

router.post('/createMonster', (req, res) => {
    let newMonster = new MonsterModel({

        jmeno: req.body.name,
        popis: req.body.description,
        typ: req.body.type,
        schopnosti: req.body.abilities,

        sila: req.body.strength,
        houzevnatost: req.body.constitution,
        obratnost: req.body.agility,
        charisma: req.body.charisma,
        inteligence: req.body.inteligence,
        znalost: req.body.knowledge,

        zbroj: req.body.armor,
        zivoty: req.body.life,

        pruraz: req.body.pierce,
        poskozeniZaklad: req.body.damageBase,
        poskozeniZavaznost: req.body.damageSeverity,

        velikostniSkupina: req.body.sizeGroup
    })


    newMonster.save().then(res.send("Uspesne zapsano"))

})

/**
 * Vrátí všechny monstra v databázi
 */
router.get("/dump", (req, res) => {
    MonsterModel.find().then(queryResult => res.send(queryResult))

})

router.get('/byType',(req,res) =>{
    console.log(req.query.typ)
    MonsterModel.find({'typ': req.query.typ})
        .then(dbResponse => {
            res.send(dbResponse)
        })
        .catch(error =>{
            res.send('Error')
            console.log(error)
        })
})

router.delete("/removeMonster", (req,res) =>{
    MonsterModel.deleteOne({'_id': req.body.id})
        .then(res.send('monsterDeleted'))
})

module.exports = router
