//Importy
const express = require('express')
const bcrypt = require("bcrypt")

//Router
const router = express.Router()

//DB Model
const SessionModel = require('../models/SessionModel');

/**
 * Kontrola funkcionality
 */
router.get("/", (req, res) => {
    console.log("Strom Sessionu");
})

/**
 * Metoda pro vrácení otevřených sessionů
 */
router.get("/openSessions", async (req, res) => {
    SessionModel.find()
        .then(sessions => res.send(JSON.stringify(sessions)))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení všech sessionů z DB:', error)
        });
})

/**
 * Routa pro vytvoření nové sessiony
 */
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

    newSession.save()
        .then(data => res.send(data._id))
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při uložení nového záznamy sessiony:', error)
        })

})

/**
 * Metoda pro kontrolu majitele sessioně
 */
router.get("/checkOwner", async (req, res) => {
    SessionModel.findOne({ _id: req.query.sid })
        .then(queryResponse => {
            if (queryResponse.owner == req.query.user) {
                res.send(true)
            } else {
                res.send(false)
            }
        })

        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při zjištění majitele sessiony:', error)
        })

})

/**
 * Navrátí Session
 */
router.get("/returnSession", (req, res) => {
    SessionModel.findOne({ _id: req.query.sessionID })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení jedné sessiony:', error)
        })
})

/**
 * Upráví záznam sessionu pro připojení hrače
 */
router.post("/joinSession", async (req, res) => {

    let session = await SessionModel.findOne({ _id: req.body.sessionID })
    try {
        if (session.password == req.body.password) {
            if (session.player1.adventurer == null && session.player1.owner == null) {
                session.player1 = {
                    owner: req.body.player,
                    adventurer: req.body.adventurer
                }
                session.slots--;
                session.save();
                res.send('Session Joined')
            } else if (session.player2.adventurer == null && session.player2.owner == null) {
                session.player2 = {
                    owner: req.body.player,
                    adventurer: req.body.adventurer
                }
                session.slots--;
                session.save();
                res.send('Session Joined')
            } else if (session.player3.adventurer == null && session.player3.owner == null) {
                session.player3 = {
                    owner: req.body.player,
                    adventurer: req.body.adventurer
                }
                session.slots--;
                session.save();
                res.send('Session Joined')
            }

        } else {
            res.send('Wrong Password')
        }
    } catch {
        res.send('Error')
        console.log('Vyskytla se chyba při připojení do sessiony:')
    }
})

/**
 * Vrátí seznam hráčů v sessioně
 */
router.get('/sessionPlayers', (req, res) => {
    SessionModel.findOne({ _id: req.query.sid })
        .then(queryData => {
            res.send([queryData.player1, queryData.player2, queryData.player3])
        })
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při vrácení hráčů v sessioně:', error)
        })
})

/**
 * Routa pro odpojení hráče z herní sessiony
 */
router.get('/sessionDisconnect', async (req, res) => {
    let session = await SessionModel.findOne({ _id: req.query.sessionID })
    try {
        if (session.owner == req.query.userID) {
            session.delete();
            res.send("Session Deleted")
            return
        } else if (session.player1.owner == req.query.userID) {
            session.player1.owner = null;
            session.player1.adventurer = null;
            session.slots = session.slots + 1
            session.save();
            res.send('Player 1 Disconnected')
            return
        } else if (session.player2.owner == req.query.userID) {
            session.player2.owner = null;
            session.player2.adventurer = null;
            session.slots = session.slots + 1
            session.save();
            res.send('Player 1 Disconnected')
            return
        } else if (session.player3.owner == req.query.userID) {
            session.player1.owner = null;
            session.player2.adventurer = null;
            session.slots = session.slots + 1
            session.save();
            res.send('Player 1 Disconnected')
            return
        }
    } catch (error) {
        res.send('Error')
        console.log('Vyskytla se chyba při odpojeníze sessiony:', error)
    }
})

/**
 * Metoda pro vyčištění celé kolekce sessionů
 */
router.get('/sessionsClear', (req, res) => {
    if (req.body.password == 'WnaBp$03^6iI')
        SessionModel.deleteMany({})
            .then(res.send('Session Cleared'))
            .catch(error => {
                res.send('Error')
                console.log('Vyskytla se chyba při vrácení vyčištění sessiony:', error)
            })

})

//Export
module.exports = router
