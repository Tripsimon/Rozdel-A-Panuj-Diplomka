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
    schopnosti:[{
        name: String,
        abilityTyp: String,
        numberOfUses: Number,
        cd: String,
        owner: String,
        descriptionLore: String,
        descriptionAbility: String,
        requiredLevel: Number
    }],
    dostupneTridy:[String],

    },
    {collection: "races"}
    )

module.exports = Rasa = mongoose.model("db_rozdel_a_panuj_races",RaceSchema,"races");
