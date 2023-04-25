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
        jmeno: String,
        typ: String,
        popis: String,
        schopnosti: [{
            jmeno: String,
            typ: String,
            cd: Number,
            schopnost: String,
        }],
        pruraznost: Number,
        poskozeniZaklad: Number,
        poskozeniZavaznost: Number,
        obrana: Number,
        vaha: Number,
        poznamka: String,
    }],
    penize: Number,
    level: Number,
    zkusenosti: Number,
},
    { collection: "DobrodruziKolekce" }
)

module.exports = Adventurer = mongoose.model("RozdelAPanuj_Adventurer", AdventurerSchema, "DobrodruziKolekce");
