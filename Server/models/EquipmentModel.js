const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schéma pro předměty dobrodruhů
 */
const EquipmentSchema = new Schema({
    jmeno: String,
    typ: String,
    popis: String,
    schopnosti: String,
    pruraznost: Number,
    poskozeniZaklad: Number,
    poskozeniZavaznost: Number,
    obrana: Number,
    vaha: Number,
    poznamka: String,},

    {collection: "VybavaKolekce"}
    )

module.exports = Equipment = mongoose.model("RozdelAPanuj_Vybava",EquipmentSchema,"VybavaKolekce");
