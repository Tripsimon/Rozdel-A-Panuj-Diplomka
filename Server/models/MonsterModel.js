const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s nepřáteli
const MonsterSchema = new Schema({
    jmeno: String,
    popis: String,
    typ: String,
    velikostniSkupina: String,

    schopnosti: [{
        jmeno:String,
        typ: String,
        cd: Number,
        schopnost: String,
    }],

    sila: Number,
    houzevnatost: Number,
    obratnost: Number,
    charisma: Number,
    inteligence: Number,
    znalost: Number,

    zbroj: Number,
    zivoty: Number,

    pruraz: Number,
    poskozeniZaklad: Number,
    poskozeniZavaznost: Number,



    },
    {collection: "monsters"}
    )

module.exports = Monstrum = mongoose.model("db_rozdel_a_panuj_monsters",MonsterSchema,"monsters");
