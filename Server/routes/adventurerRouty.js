const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()


const AdventurerModel = require('../models/AdventurerModel');

router.get("/", (req,res) =>{
    res.send("Router strom Charakteru")
})


router.post("/characterCreation", (req,res) =>{
    console.log('připojeno')
    console.log(req.body.newAdventurer)
    console.log(req.body)
    data = req.body.newAdventurer
    atributesInput = req.body.atributes
    const newAdventurer = new AdventurerModel({
        owner: req.body.owner,
        name: data.name,
        health: atributesInput.houzevnatost ,
        secondName: data.secondName,
        nickname: data.nickname,
        race: data.race,
        class: data.class,
        mainGear: data.mainGear,
        secondaryGear: data.secondaryGear,
        bonusGear: data.bonusGear,
        aligment: data.aligment,
        atributes: {
            sila: atributesInput.sila,
            houzevnatost: atributesInput.houzevnatost,
            obratnost: atributesInput.obratnost,
            charisma: atributesInput.charisma,
            inteligence: atributesInput.inteligence,
            znalost: atributesInput.znalost
        },
        level:1,
        experience:0,
        money:3
    })
    newAdventurer.save().then(res.send("Character Cretion"))
    
})

router.get("/getCharacters", async (req,res) =>{
    res.send(await AdventurerModel.find({owner: req.query.owner }))
})


router.get('/SessionAdventurers', (req,res) =>{
    console.log(req.query.sid)
    AdventurerModel.find({_id: req.query.adventurer1})
        .then(queryData => res.send(queryData))

})

module.exports = router