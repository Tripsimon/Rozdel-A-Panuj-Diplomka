const express = require('express')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const router = express.Router()
const fs = require('fs');
router.use(bodyParser.json())

//DB Model
const ImageModel = require('../models/ImageModel.js')


const storage = multer.diskStorage({
    destination: function (req,file,callback) {
        callback(null, __dirname+'/../files/backgrounds')
    },
    filename: function(req,file,callback){
        callback(null,file.originalname+'.jpg');
    }
})

const upload = multer({storage:storage})


router.get("/", (req,res) =>{
    res.send("Práce s pozadím")
 })

router.post('/nahraniSouboru', upload.single('image') ,(req,res)=>{
    newImage = new ImageModel({
        name: req.file.filename
    })
    newImage.save()
    res.send('fileUploaded')
})


router.delete('/smazaniSouboru/:fileName',async (req,res) =>{
    console.log(await ImageModel.deleteOne({name: req.params.fileName}))
    fs.unlink('files/backgrounds/'+req.params.fileName,(err)=>{
        if(err){console.log(err)}else{
            res.sendStatus(200)
        }
    })

})

router.get('/dump',async (req,res) =>{
    let pozadi = []
    const images = await ImageModel.find()
    images.forEach(element => {
        console.log( pozadi.push( element.name))
    });
    res.send(pozadi)
})

module.exports = router