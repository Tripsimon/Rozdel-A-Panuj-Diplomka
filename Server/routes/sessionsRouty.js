const express = require('express')
const bcrypt = require("bcrypt")

const router = express.Router()

// DB Model
const SessionModel = require('../models/SessionModel');

router.get("/", (req, res) => {
    console.log("Strom Sessionu");
})

router.get("/openSessions", async (req, res) => {
    SessionModel.find()
        .then(sessions => res.send(JSON.stringify( sessions)))
        .catch(err => console.log(err));
})

router.post("/createSession", async (req, res) => {
    newSession = new SessionModel({
        owner: req.body.majitel,
        ownerName: req.body.jmenoMajitele,
        sessionName: req.body.jmenoSessionu,
        password: req.body.heslo,
        slots: 3,

        player1: {
            owner: null,
            adventurer: null
        },

        player2: {
            owner: null,
            adventurer: null
        },

        player3: {
            owner: null,
            adventurer: null
        }
        
    });

    newSession.save().then(data => res.send(data._id))
})

router.get("/checkOwner", async (req, res) => {

    SessionModel.findOne({_id: req.query.sid}).then(data => {
        if (data.owner == req.query.user) {
            res.send(true)
        } else {
            res.send(false)
        }
    })
})

/**
 * Navrátí Session
 */
router.get("/returnSession", (req,res) =>{
    SessionModel.findOne({_id: req.query.sessionID})
        .then(result => {
            res.send(result);
        })
})

router.post("/joinSession",(req,res) =>{
    SessionModel.findOne({returnSession: req.body.sessionName})
    .then(result => {
        if (result.password == req.body.password) {
            switch (result.slots) {
                case 3:
                    SessionModel.findOneAndUpdate({returnSession: req.body.sessionName},{slots: 2,player1: {owner: req.body.player,adventurer: req.body.adventurer}})
                        .then(resp => console.log(resp))
                    break;
            
                default:
                    break;
            }
            res.send( result._id);
        }else{res.send(false)}

    })
})

router.get('/sessionPlayers',  (req,res) =>{
    console.log(req.query)
    SessionModel.findOne({_id: req.query.sid})
        .then(queryData => {
            //res.send([queryData.player1,queryData.player2,queryData.player3])
        })
    
    
})

module.exports = router
