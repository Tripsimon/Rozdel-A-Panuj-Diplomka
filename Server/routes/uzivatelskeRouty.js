//Importy
const express = require('express')
const bcrypt = require("bcrypt")

//Router
const router = express.Router()

//DB Model
const UserModel = require('../models/UserModel');
const { exit } = require('process');

//Kontrola funkcionality
router.get("/", (req, res) => {
    res.send("Strom uživatelů")
})

/**
 * Routa pro registraci nového uživatele
 */
router.post("/registrace", async (req, res) => {

    //Kontrola využití dat
    let usedNick = await UserModel.exists({ 'prezdivka': req.body.prezdivka })
    let usedMail = await UserModel.exists({ 'email': req.body.email })

    //Enkripce hesla
    const salt = await bcrypt.genSalt(10);
    hashovaneHeslo = await bcrypt.hash(req.body.heslo, salt);

    //Kontrola existence
    if (usedMail != null) {
        console.log('Sem to spadne mail')
        res.send('usedMail');
        return
    } else if (usedNick != null) {
        console.log('Sem to spadne nick')
        res.send('usedNick');
        return
    } else {
        console.log('Vytvářím ucet')
        const newUser = new UserModel({
            email: req.body.email,
            prezdivka: req.body.prezdivka,
            heslo: hashovaneHeslo,
            opravneni: 'uzivatel'
        });
        newUser.save()
            .then(queryData => {
                res.status(201);
                res.send(queryData._id);
                console.log('Zalozen novy ucet');
            })
            .catch(error => {
                res.send('Error')
                console.log('Vyskytla se chyba při registraci nového uživatele:', error)
            })

    }
})

/**
 * Routa pro přihlášení
 */
router.post("/prihlaseni", async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    heslo = req.body.heslo

    UserModel.findOne({ email: req.body.email })
        .then(async User => {
            if (User == null) {
                res.send('No User Found');
            } else {

                const porovnej = await bcrypt.compare(heslo, User.heslo)
                if (porovnej) {
                    res.status(200);
                    res.json({
                        prezdivka: User.prezdivka,
                        _id: User._id,
                        opravneni: User.opravneni
                    });
                } else {
                    res.send('Wrong Password')
                }
            }
        })
        .catch(error => {
            res.send('Error')
            console.log('Vyskytla se chyba při přihlášení uživatele:', error)
        })

})

//Export
module.exports = router