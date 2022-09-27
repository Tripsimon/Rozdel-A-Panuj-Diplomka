const express = require('express')
const router = express.Router()

router.get("/characterCreation", (req,res) =>{
    res.send("Character Cretion")
})

router.get("/characterCreation/classes", (req,res) =>{
    res.json({"LMAO":1234})
    //res.send(['Kolos','Harcovník','Hraničář','Lupič','Čaroděj','Vizír']);
})

module.exports = router