const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()


const AdventurerModel = require('../models/AdventurerModel');
const { response } = require('express');

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
        majitel: req.body.owner,
        krestniJmeno: data.name,
        prijmeni: data.secondName,
        prezdivka: data.nickname,
        zivoty: atributesInput.houzevnatost ,
        rasa: data.race,
        trida: data.class,
        mainGear: data.mainGear,
        secondaryGear: data.secondaryGear,
        bonusGear: data.bonusGear,
        presvedceni: data.aligment,
        atributy: {
            sila: atributesInput.sila,
            houzevnatost: atributesInput.houzevnatost,
            obratnost: atributesInput.obratnost,
            charisma: atributesInput.charisma,
            inteligence: atributesInput.inteligence,
            znalost: atributesInput.znalost
        },
        inventar:[data.mainGear,data.secondaryGear,data.bonusGear],
        penize:3,
        level:1,
        zkusenosti:0

    })
    newAdventurer.save().then(res.send("Character Cretion"))
    
})

router.get("/getCharacters", async (req,res) =>{
    res.send(await AdventurerModel.find({owner: req.query.owner }))
})


//Metoda pro navrácení všech dobrodruhů při resincu sessionu
router.get('/getMultipleAdventurers', (req,res) =>{
    console.log(req.query.adventurers)
    AdventurerModel.find({_id: {$in: req.query.adventurers}})
        .then(responseQuery => res.send(responseQuery))

})

router.get('/SessionAdventurers', (req,res) =>{
    console.log(req.query.sid)
    AdventurerModel.find({_id: req.query.adventurer1})
        .then(queryData => res.send(queryData))

})

// Přidá předmět do batohu dobrodruha
router.post('/putIntoInventory',async (req,res) =>{
    let adventurer = await AdventurerModel.findOne({_id: req.body.adventurer})
    adventurer.inventar.push(req.body.item)
    adventurer.save()
        .then(res.send(true))
        
})

// Odebere předmět z batohu dobrodruha
router.post('/removeFromInventory', async (req,res) =>{
    let adventurer = await AdventurerModel.findOne({_id: req.body.adventurer})
    adventurer.inventar.pull(req.body.item)
    adventurer.save()
        .then(res.send(true))
})

router.post('/changeMoney',async (req,res) =>{

   AdventurerModel.updateOne({_id: req.body.adventurer}, {penize: req.body.money})
    .then(res.send(true))

})

module.exports = router