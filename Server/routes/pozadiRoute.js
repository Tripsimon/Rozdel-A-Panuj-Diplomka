const express = require('express')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const router = express.Router()
const fs = require('fs');
router.use(bodyParser.json())

//DB Model
const ImageModel = require('../models/ImageModel.js')

let fileName = "Neuvedeno"

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb)=>{
        cb(null,fileName + '.jpg');
    },
});

const upload = multer({
    storage:Storage
}).single('testImage')

router.get("/", (req,res) =>{
   res.send("Práce s pozadím")
})

router.post('/setFileName',(req,res)=>{
    fileName = req.body.name
})

router.post('/nahraniSouboru',async (req,res)=>{

    //TODO:: Opravit
    await upload(req,res,(err)=>{
        if (err) {
            console.log(err);
        }else{
             const  newImage =  new  ImageModel({
                name: fileName,
                image: {
                    data:req.file.filename,
                    contenType: 'image/jpg'
                }
            })

            newImage.save()
                .then(res.send("fileSaved"))
                .catch(err=>console.log(err))
        }
    })
    
    
})

router.delete('/smazaniSouboru/:fileName',async (req,res) =>{
    console.log(await ImageModel.deleteOne({name: req.params.fileName}))
    fs.unlink('uploads/'+req.params.fileName+'.jpg',(err)=>{
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