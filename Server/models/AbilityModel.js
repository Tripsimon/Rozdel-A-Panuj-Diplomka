const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s Schopnostmi
const AbilitySchema = new Schema({
    jmeno: String,
    typPouziti: String,
    pocetPouziti: Number,
    cd: String,
    majitel:String,
    popisFluff:String,
    popisSchopnosti:String},

    {collection: "abilities"}
    )

module.exports = Ability = mongoose.model("db_rozdel_a_panuj_abilities",AbilitySchema,"abilities");
