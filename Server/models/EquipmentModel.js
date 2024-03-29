const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schéma pro předměty dobrodruhů
 */
const EquipmentSchema = new Schema({
    jmeno: String,
    typ: String,
    popis: String,
    schopnosti: [{
        jmeno:String,
        typ: String,
        cd: Number,
        schopnost: String,
    }],
    pruraznost: Number,
    poskozeniZaklad: Number,
    poskozeniZavaznost: Number,
    obrana: Number,
    vaha: Number,
    poznamka: String,
    mazatelnost: Boolean,
},

    {collection: "equipments"}
    )

module.exports = Equipment = mongoose.model("db_rozdel_a_panuj_equipments",EquipmentSchema,"equipments");
