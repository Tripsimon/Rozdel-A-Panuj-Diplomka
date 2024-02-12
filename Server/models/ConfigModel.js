const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s configem
const ConfigSchema = new Schema({
    typ: String,
    hodnota: [String]
},{collection: "config"})

module.exports = Ability = mongoose.model("db_rozdel_a_panuj_config",ConfigSchema,"config");
