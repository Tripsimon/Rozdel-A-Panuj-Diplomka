//Importy
const express = require('express')

//Router
const router = express.Router()

//DB Model
const AdventurerModel = require('../models/AdventurerModel');

/**
 * Kontrola funkce
 */
router.get("/", (req, res) => {
    res.send("Router strom Charakteru")
})

/**
 * Routa pro vytvoření nového dobrodruha
 */
router.post("/characterCreation", (req, res) => {
    data = req.body.newAdventurer
    atributesInput = req.body.atributes

    const newAdventurer = new AdventurerModel({
        majitel: req.body.owner,
        krestniJmeno: data.name,
        prijmeni: data.secondName,
        prezdivka: data.nickname,
        zivoty: (atributesInput.houzevnatost * 10),
        aktualniZivoty:(atributesInput.houzevnatost * 10),
        rasa: data.race,
        trida: data.class,
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
        inventar: [data.mainGear , data.secondaryGear, data.bonusGear, data.armor],
        penize: 3,
        level: 1,
        zkusenosti: 0

    })
    newAdventurer.save()
        .then(res.send("Character Created"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vytvoření nového dobrodruha:', error)
        })

})

/**
 * Vrátí dobrodruhy jednoho hráče podle jeho _id
 */
router.get("/getCharacters", (req, res) => {
    AdventurerModel.find({ majitel: req.query.owner })
        .then(queryResponse => {
            res.send(queryResponse)
        })
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení dat charakterů podle majitele:', error)
        })
})


/**
 * Routa pro navrácení více dobrodruhů
 */
router.get('/getMultipleAdventurers', (req, res) => {
    AdventurerModel.find({ _id: { $in: req.query.adventurers } })
        .then(responseQuery => res.send(responseQuery))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při charakterů podle ID:', error)
        })
})

router.get('/sessionAdventurers', (req, res) => {

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

    AdventurerModel.find({ _id: { $in: queryData } })
        .then(queryData => res.send(queryData))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení charakterů v dané sessioně:', error)
        })
})

/**
 * Přidá předmět do inventáře dobrodruha
 */
router.post('/putIntoInventory', async (req, res) => {
    let adventurer = await AdventurerModel.findOne({ _id: req.body.adventurer })
    adventurer.inventar.push(req.body.item)
    adventurer.save()
        .then(res.send("Item Added"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při přidání předmětu do inventáře:', error)
        })

})

/**
 * Odebere předmět z inventáře dobrodruha
 */
router.post('/removeFromInventory', async (req, res) => {
    let adventurer = await AdventurerModel.findOne({ _id: req.body.adventurer })
    adventurer.inventar.pull(req.body.item)
    adventurer.save()
        .then(res.send("Item Removed"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při odebrání předmětu z inventáře:', error)
        })
})

/**
 * Routa pro změny peněz dobrodruha
 */
router.post('/changeMoney', (req, res) => {
    AdventurerModel.updateOne({ _id: req.body.adventurer }, { penize: req.body.money })
        .then(res.send("Money Changed"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při změně peněz:', error)
        })

})

/**
 * Routa pro změnu levelu a zkušeností
 */
router.post('/changeLevelAndExperience', async (req, res) => {
    let adventurer = await AdventurerModel.findOne({ _id: req.body.adventurer })

    if (req.body.level != undefined) {
        adventurer.level = req.body.level
    }

    if (req.body.zkusenosti != undefined) {
        adventurer.zkusenosti = req.body.zkusenosti
    }

    adventurer.save()
        .then(res.send("Level and Experience Changed"))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při změně levelu a zkušeností:', error)
        })
})

/**
 * Změní počet aktuálních životů
 */
router.post('/changeActualLife', (req, res) =>{
    AdventurerModel.findOneAndUpdate({_id: req.body.adventurer},{ aktualniZivoty: req.body.zivoty})
    .then(res.send('Life Changed'))
    .catch(error => {
        res.send('Error')
        console.log('Vyskytla se chyba při mazání charakteru:', error)
    })
})

/**
 * Routa pro odebrání dobrodruha
 */
router.delete('/deleteAdventurer', (req, res) => {
    AdventurerModel.deleteOne({ _id: req.body.adventurer })
        .then(res.send('Adventurer Deleted'))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při mazání charakteru:', error)
        })

})

module.exports = router