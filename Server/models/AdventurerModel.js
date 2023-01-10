const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Vytvoření schéma pro práci s Dobrodruhy
const AdventurerSchema = new Schema({
    owner: String,
    name: String,
    health: Number,
    secondName: String,
    nickname: String,
    race: String,
    class: String,
    mainGear: String,
    secondaryGear: String,
    bonusGear: String,
    aligment: String,
    atributes:{
        sila: Number,
        houzevnatost: Number,
        obratnost: Number,
        charisma: Number,
        inteligence: Number,
        znalost: Number
    },
    level: Number,
    experience: Number,
    money: Number,
},
    {collection: "DobrodruziKolekce"}
    )

module.exports = Adventurer = mongoose.model("RozdelAPanuj_Adventurer",AdventurerSchema,"DobrodruziKolekce");
