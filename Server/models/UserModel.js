const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Vytvoření schéma pro práci s artefatky
const UserSchema = new Schema({
    email: String,
    heslo: String,
    prezdivka: String,},
    {collection: "UzivateleKolekce"}
    )

module.exports = Artefact = mongoose.model("RozdelAPanuj_Develop",UserSchema,"UzivateleKolekce");
