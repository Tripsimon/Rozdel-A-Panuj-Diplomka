//Importy
const express = require('express')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs');

//Router
const router = express.Router()
router.use(bodyParser.json())

//DB Model
const ImageModel = require('../models/ImageModel.js')

//Nastavení storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../files/backgrounds')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname + '.jpg');
    }
})

//Multer
const upload = multer({ storage: storage })

//Kontrola funkce
router.get("/", (req, res) => {
    res.send("Práce s pozadím")
})

//Routa pro nahrání nového souboru
router.post('/nahraniSouboru', upload.single('image'), (req, res) => {
    newImage = new ImageModel({
        name: req.file.filename
    })

    newImage.save()
        .then(res.send('File Uploaded'))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při nahrávání nového pozadí:', error)
        })
})

//Routa pro smazání souboru
router.delete('/smazaniSouboru/:fileName', async (req, res) => {
    console.log(await ImageModel.deleteOne({ name: req.params.fileName }))
    fs.unlink('files/backgrounds/' + req.params.fileName, (err) => {
        if (err) { 

                res.send('Error')
                console.log('Vyskytla se chyba při mazání pozadí:', error)
        } else {
            res.sendStatus(200)
        }
    })

})

//Routa pro vrácení všech pozadí
router.get('/dump', async (req, res) => {
    let pozadi = []
    const images = await ImageModel.find()
    images.forEach(element => {
        console.log(pozadi.push(element.name))
    });
    res.send(pozadi)
})

//Export
module.exports = router