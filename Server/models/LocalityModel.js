const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s povoláním
const LocalitySchema = new Schema({
    name: String,
    width: String,
    height: String,
    map: [[Number]],
    owner: String,
    },
    {collection: "locality"}
    )

module.exports = Trida = mongoose.model("db_rozdel_a_panuj_locality",LocalitySchema,"locality");
