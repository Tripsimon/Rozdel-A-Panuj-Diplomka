const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Vytvoření schéma pro práci s uživateli
const MonsterSchema = new Schema({
    jmeno: String,
    popis: String,

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

    velikostniSkupina: String

    },
    {collection: "MonstraKolekce"}
    )

module.exports = Monstrum = mongoose.model("RozdelAPanuj_Monstra",MonsterSchema,"MonstraKolekce");
