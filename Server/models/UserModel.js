const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Vytvoření schéma pro práci s uživateli
const UserSchema = new Schema({
    email: String,
    heslo: String,
    prezdivka: String,
    opravneni: String,
    },
    {collection: "UzivateleKolekce"}
    )

module.exports = User = mongoose.model("lesak",UserSchema,"UzivateleKolekce");
