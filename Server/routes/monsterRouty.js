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

        sila: req.body.strength,
        houzevnatost: req.body.constitution,
        obratnost: req.body.agility,
        charisma: req.body.charisma,
        inteligence: req.body.inteligence,
        znalost: req.body.knowledge,

        zbroj: req.body.armor,
        zivoty: req.body.life,

        pruraz: req.body.pierce,
        poskozeni: req.body.damage,

        velikostniSkupina: req.body.sizeGroup
    })


    newMonster.save().then(res.send("Uspesne zapsano"))

})

router.get("/dump", (req, res) => {
    MonsterModel.find().then(queryResult => res.send(queryResult))

})

module.exports = router
