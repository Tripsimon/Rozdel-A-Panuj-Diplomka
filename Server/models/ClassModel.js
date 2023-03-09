const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s uživateli
const ClassSchema = new Schema({
    jmeno: String,
    popis: String,
    pasivniSchopnost: String,
    schopnosti: [String],
    bonusovaVybava: [String],
    hlavniVybava: [String],
    krajniVybava: [String],
    },
    {collection: "MonstraKolekce"}
    )

module.exports = Trida = mongoose.model("RozdelAPanuj_Tridy",ClassSchema,"TridyKolekce");