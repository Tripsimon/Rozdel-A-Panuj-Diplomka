const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s uživateli
const ConfigSchema = new Schema({
    typ: String,
    hodnota: [String]
},{collection: "Konfigurace"})

module.exports = Ability = mongoose.model("RozdelAPanuj_Config",ConfigSchema,"Konfigurace");
