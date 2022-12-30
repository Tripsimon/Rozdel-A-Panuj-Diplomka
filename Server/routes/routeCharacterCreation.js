const express = require('express')


const router = express.Router()


const AdventurerModel = require('../models/AdventurerModel');

router.get("/", (req,res) =>{
    res.send("Router strom Charakteru")
})


router.post("/characterCreation", (req,res) =>{
    console.log('připojeno')
    console.log(req.body.newAdventurer)
    data = req.body.newAdventurer

    const newAdventurer = new AdventurerModel({
        name: data.name,
        health: atributes.houzevnatost/2 ,
        secondName: data.secondName,
        nickname: data.nickname,
        race: data.race,
        class: data.class,
        mainGear: data.mainGear,
        secondaryGear: data.secondaryGear,
        bonusGear: data.bonusGear,
        aligment: data.aligment,
        atributes: {
            sila: atributes.sila,
            houzevnatost: atributes.houzevnatost,
            obratnost: atributes.obratnost,
            charisma: atributes.charisma,
            inteligence: atributes.inteligence,
            vedeni: atributes.vedeni
        },
        level:1,
        experience:0,
        money:3
    })
    newAdventurer.save().then(res.send("Character Cretion"))
    
})



module.exports = router