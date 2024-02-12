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
            adventurer: String
        },
    player2: {
            owner: String,
            adventurer: String
        },
    player3: {
            owner: String,
            adventurer: String
        },
    log: [String]
    
}, {collection: "sessions"})

module.exports = User = mongoose.model("db_rozdel_a_panuj_sessions", SessionSchema, "sessions");
