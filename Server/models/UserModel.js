const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s uživateli
const UserSchema = new Schema({
    email: String,
    heslo: String,
    prezdivka: String,
    opravneni: String,
    },
    {collection: "users"}
    )

module.exports = User = mongoose.model("db_rozdel_a_panuj_users",UserSchema,"users");
