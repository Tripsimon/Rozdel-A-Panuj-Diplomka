const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Vytvoření schéma pro práci s uživateli
const EquipmentSchema = new Schema({
    jmeno: String,
    typ: String,
    popis: String,
    pruraznost: Number,
    poskozeni: Number,
    obrana: Number,
    vaha: Number,
    poznamka: String,},

    {collection: "VybavaKolekce"}
    )

module.exports = Equipment = mongoose.model("RozdelAPanuj_Vybava",EquipmentSchema,"VybavaKolekce");
