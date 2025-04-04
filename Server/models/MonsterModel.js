const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s nepřáteli
const MonsterSchema = new Schema({
    name: String,
    description: String,
    typ: String,
    sizeGroup: String,

    abilities: [{
        name: String,
        typ: String,
        cooldown: Number,
        effect: String,
    }],

    strength: Number,
    constitution: Number,
    agility: Number,
    charisma: Number,
    inteligence: Number,
    knowledge: Number,

    armor: Number,
    life: Number,

    pierce: Number,
    damageBase: Number,
    damageSeverity: Number,



    },
    {collection: "monsters"}
    )

module.exports = Monstrum = mongoose.model("db_rozdel_a_panuj_monsters",MonsterSchema,"monsters");
