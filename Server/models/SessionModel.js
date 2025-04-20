const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Vytvoření schéma pro práci s herními místnostmi
const SessionSchema = new Schema({
    owner: String,
    ownerName: String,
    sessionName: String,
    password: String,
    slots: Number,

    player1: {
            owner: String,
            adventurer: { type: mongoose.Schema.Types.ObjectId, ref: 'db_rozdel_a_panuj_adventurers' }
        },
    player2: {
            owner: String,
            adventurer: { type: mongoose.Schema.Types.ObjectId, ref: 'db_rozdel_a_panuj_adventurers' }
        },
    player3: {
            owner: String,
            adventurer: { type: mongoose.Schema.Types.ObjectId, ref: 'db_rozdel_a_panuj_adventurers' }
        },
    log: [String]
    
}, {collection: "sessions"})

module.exports = User = mongoose.model("db_rozdel_a_panuj_sessions", SessionSchema, "sessions");
