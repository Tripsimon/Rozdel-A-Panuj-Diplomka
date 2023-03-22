const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()


const AdventurerModel = require('../models/AdventurerModel');
const { response } = require('express');

router.get("/", (req,res) =>{
    res.send("Router strom Charakteru")
})


router.post("/characterCreation", (req,res) =>{
    data = req.body.newAdventurer
    atributesInput = req.body.atributes

    const newAdventurer = new AdventurerModel({
        majitel: req.body.owner,
        krestniJmeno: data.name,
        prijmeni: data.secondName,
        prezdivka: data.nickname,
        zivoty: (atributesInput.houzevnatost *10) ,
        rasa: data.race,
        trida: data.class,
        mainGear: data.mainGear,
        secondaryGear: data.secondaryGear,
        bonusGear: data.bonusGear,
        presvedceni: data.aligment,
        vek: data.age,
        popis: data.description,
        pribeh: data.story,
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
    newAdventurer.save()
    .then(res.send("Character Cretion"))
    .catch(err =>{
        console.log(err);
        res.send('err')
    })
    
})

router.get("/getCharacters",  (req,res) =>{
    AdventurerModel.find({majitel: req.query.owner })
    .then(queryResponse => {
        res.send(queryResponse)
    })
    .catch(err =>{
        console.log(err);
        res.send('err')
    })
})


//Metoda pro navrácení všech dobrodruhů při resincu sessionu
router.get('/getMultipleAdventurers', (req,res) =>{
    AdventurerModel.find({_id: {$in: req.query.adventurers}})
        .then(responseQuery => res.send(responseQuery))
        .catch(err =>{
            console.log(err);
            res.send('err')
        })
    
})

router.get('/sessionAdventurers', (req,res) =>{
    
    let queryData = []
    if (req.query.adventurer1 != null) {
        queryData.push(req.query.adventurer1)
    }
    if (req.query.adventurer2 != null) {
        queryData.push(req.query.adventurer2)
    }
    if (req.query.adventurer3 != null) {
        queryData.push(req.query.adventurer3)
    }
    
    AdventurerModel.find({_id: {$in: queryData}})
        .then(queryData => res.send(queryData))
        .catch(err =>{
            console.log(err);
            res.send('err')
        })
    
})

/**
 * Přidá předmět do inventáře dobrodruha
 */
router.post('/putIntoInventory',async (req,res) =>{
    let adventurer = await AdventurerModel.findOne({_id: req.body.adventurer})
    adventurer.inventar.push(req.body.item)
    adventurer.save()
        .then(res.send(true))
        .catch(err =>{
            console.log(err);
            res.send('err')
        })
        
})

/**
 * Odebere předmět z inventáře dobrodruha
 */
router.post('/removeFromInventory', async (req,res) =>{
    let adventurer = await AdventurerModel.findOne({_id: req.body.adventurer})
    adventurer.inventar.pull(req.body.item)
    adventurer.save()
        .then(res.send(true))
        .catch(err =>{
            console.log(err);
            res.send('err')
        })
})

router.post('/changeMoney', (req,res) =>{
   AdventurerModel.updateOne({_id: req.body.adventurer}, {penize: req.body.money})
    .then(res.send(true))
    .catch(err =>{
        console.log(err);
    })

})

router.post('/changeLevelAndExperience', async (req,res) =>{
    let adventurer = await AdventurerModel.findOne({_id: req.body.adventurer})

    if (req.body.level != undefined) {
        adventurer.level = req.body.level
    }

    if (req.body.zkusenosti != undefined) {
        adventurer.zkusenosti = req.body.zkusenosti
    }

    adventurer.save()
        .then(res.send(true))
        .catch(err =>{
            console.log(err);
            res.send('err')
        })
})

router.delete('/deleteAdventurer',(req,res) =>{
    AdventurerModel.deleteOne({_id: req.body.adventurer})
        .then(res.send('actionComplete'))
        .catch(err =>{console.log(err); res.send('err')})
    
})

module.exports = router