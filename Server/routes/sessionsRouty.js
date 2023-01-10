const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

//DB Model
const SessionModel = require('../models/SessionModel');

router.get("/", (req,res) =>{
console.log("Strom Sessionu");
})

router.get("/openSessions",async(req,res) =>{
    SessionModel.find()
        .then(sessions => res.json(sessions))
        .catch(err => console.log(err));
})

router.post("/createSession",async(req,res) =>{
    newSession = new SessionModel({
        owner: req.body.majitel,
        ownerName: req.body.jmenoMajitele,
        sessionName: req.body.jmenoSessionu,
        password: req.body.heslo,
    });

    newSession.save()
        .then(data => res.send(data._id))
})

router.get("/checkOwner",async (req,res) =>{

    SessionModel.findOne({_id: req.query.sid})
        .then(data => {
            if(data.owner == req.query.user){res.send(true)}else{res.send(false)}
        })
})



module.exports = router