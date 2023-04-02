const express = require('express')
const router = express.Router()

// DB Model
const ConfigSchema = require('../models/ConfigModel.js');

router.get("/", (req, res) => {
    res.send("Strom konfigurace");
})

router.get('/get', (req,res) =>{
    ConfigSchema.findOne({typ:req.query.typ})
        .then(queryResponse =>  res.send(queryResponse.hodnota))
})


module.exports = router
