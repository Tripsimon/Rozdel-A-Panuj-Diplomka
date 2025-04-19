const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s povoláním
const ClassSchema = new Schema({
    jmeno: String,
    popis: String,
    abilities: [{
        name: String,
        abilityTyp: String,
        numberOfUses: Number,
        cd: String,
        owner: String,
        descriptionLore: String,
        descriptionAbility: String,
        requiredLevel: Number
    }],
    mainEquipment: [{

        "name": String,
        "typ": String,
        "description": String,
        "abilities": [String],
        "pierce": Number,
        "damageBase": Number,
        "damageSeverity": Number,
        "weight": Number,
        "note": String

    }],
    armorEquipment: [
        {
        "name": String,
        "typ": String,
        "description": String,
        "abilities": [String],
        "weight": Number,
      }],
    bonusEquipment: [{
        "name": String,
        "typ": String,
        "description": String,
        "abilities": [String],
        "weight": Number,
        "deletable": Boolean,
      }],
    zbrojVýbava: [String],
    role: String,
    trueZbrane: String
},
    { collection: "classes" }
)

module.exports = Trida = mongoose.model("db_rozdel_a_panuj_classes", ClassSchema, "classes");
