const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schéma pro předměty dobrodruhů
 */
const EquipmentSchema = new Schema({
    name: String,
    typ: String,
    description: String,
    abilities: [{
        jmeno:String,
        typ: String,
        cd: Number,
        schopnost: String,
    }],
    pierce: Number,
    damageBase: Number,
    damageSeverity: Number,
    obrana: Number,
    weight: Number,
    deletable: Boolean,
},

    {collection: "equipments"}
    )

module.exports = Equipment = mongoose.model("db_rozdel_a_panuj_equipments",EquipmentSchema,"equipments");
