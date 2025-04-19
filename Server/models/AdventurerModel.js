const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s Dobrodruhy
const AdventurerSchema = new Schema({
    majitel: String,
    krestniJmeno: String,
    prijmeni: String,
    prezdivka: String,
    zivoty: Number,
    aktualniZivoty: Number,
    rasa: String,
    trida: String,
    presvedceni: String,
    vek: Number,
    popis: String,
    pribeh: String,
    atributy: {
        sila: Number,
        houzevnatost: Number,
        obratnost: Number,
        charisma: Number,
        inteligence: Number,
        znalost: Number
    },
    inventar: [{
        name: String,
        typ: String,
        description: String,
        abilities: [{
            jmeno: String,
            typ: String,
            cd: Number,
            schopnost: String,
        }],
        pierce: Number,
        damageBase: Number,
        damageSeverity: Number,
        armor: Number,
        weight: Number,
        note: String,
    }],
    penize: Number,
    level: Number,
    zkusenosti: Number,
},
    { collection: "adventurers" }
)

module.exports = Adventurer = mongoose.model("db_rozdel_a_panuj_adventurers", AdventurerSchema, "adventurers");
