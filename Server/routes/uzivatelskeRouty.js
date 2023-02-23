const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

//DB Model
const UserModel = require('../models/UserModel');
const { exit } = require('process');

router.get("/", (req,res) =>{
    UserModel.findById('633f3ddd1e466bc5da8211f5')
        .then(User => res.json(User))
        .catch(err => console.log(err));;
})

router.post("/registrace", async (req,res) =>{

    let usedNick = await UserModel.exists({'prezdivka': req.body.prezdivka})
    let usedMail = await UserModel.exists({'email': req.body.email})
    
    const salt = await bcrypt.genSalt(10);
    hashovaneHeslo = await bcrypt.hash(req.body.heslo,salt);

    //Kontrola existence
    if(usedMail != null ){
        console.log('Sem to spadne mail')
        res.send('usedMail');
    }else if(usedNick != null){
        console.log('Sem to spadne nick')
        res.send('usedNick');
    }else{
        console.log('Vytvářím ucet')
        const newUser = new UserModel({
            email: req.body.email,
            prezdivka: req.body.prezdivka,
            heslo: hashovaneHeslo
        });
        newUser.save()
            .then( queryData =>
                {   
                    res.status(200);
                    res.send(queryData._id);
                    console.log('Zalozen novy ucet');
                })
            
    }
})

router.post("/prihlaseni", async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    heslo = req.body.heslo
    

    UserModel.findOne({email:req.body.email})
        .then(async User  =>
            {
                if(User == null){
                    console.log("Rip Ucet");
                    res.status(404);
                    res.send(null);
                    
                }else{

                console.log(User.heslo);
                const porovnej = await bcrypt.compare(heslo,User.heslo)
                
                if(porovnej){
                    res.status(200);
                    res.json({
                        prezdivka : User.prezdivka,
                        _id : User._id
                    });
                }else{
                    res.status(400);
                    res.send(false)
                }
            }
        }
    )



})
module.exports = router