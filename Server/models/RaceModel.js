//Importy
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s uživateli
const RaceSchema = new Schema({
    jmeno: String,
    popis: String,
    bonusoveAtributy:{
        sila: Number,
        houzevnatost: Number,
        obratnost: Number,
        charisma: Number,
        inteligence: Number,
        znalost: Number
    },
    schopnosti:[String],
    dostupneTridy:[String],

    },
    {collection: "MonstraKolekce"}
    )

module.exports = Rasa = mongoose.model("RozdelAPanuj_Rasy",RaceSchema,"RasyKolekce");
