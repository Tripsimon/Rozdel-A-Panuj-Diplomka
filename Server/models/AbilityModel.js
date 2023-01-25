const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Vytvoření schéma pro práci s uživateli
const AbilitySchema = new Schema({
    jmeno: String,
    typPouziti: String,
    pocetPouziti: Number,
    cd: String,
    majitel:String,
    popisFluff:String,
    popisSchopnosti:String},

    {collection: "VybavaKolekce"}
    )

module.exports = Ability = mongoose.model("RozdelAPanuj_Schopnosti",AbilitySchema,"SchopnostiKolekce");
