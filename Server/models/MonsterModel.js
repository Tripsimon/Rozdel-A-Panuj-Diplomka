const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Vytvoření schéma pro práci s uživateli
const MonsterSchema = new Schema({
    jmeno:String,
    skupina: String,
    popis: String,
    hbitost: Number,
    houzevnatost: Number,
    zbroj: Number,
    iniciativa: Number,
    velikost: String},
    {collection: "MonstraKolekce"}
    )

module.exports = Monstrum = mongoose.model("RozdelAPanuj_Monstra",MonsterSchema,"MonstraKolekce");
