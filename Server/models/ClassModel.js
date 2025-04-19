const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s povoláním
const ClassSchema = new Schema({
    jmeno: String,
    popis: String,
    abilities:[{
        name: String,
        abilityTyp: String,
        numberOfUses: Number,
        cd: String,
        owner: String,
        descriptionLore: String,
        descriptionAbility: String,
        requiredLevel: Number
    }],
    bonusovaVybava: [String],
    hlavniVybava: [String],
    krajniVybava: [String],
    zbrojVýbava: [String],
    role: String,
    trueZbrane: String
    },
    {collection: "classes"}
    )

module.exports = Trida = mongoose.model("db_rozdel_a_panuj_classes",ClassSchema,"classes");
