const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Vytvoření schéma pro práci s uživateli
const SessionSchema = new Schema({
    owner: String,
    ownerName: String,
    sessionName: String,
    password: String,},
    {collection: "SessionsKolekce"}
    )

module.exports = User = mongoose.model("SessionsKolekce",SessionSchema,"SessionsKolekce");
