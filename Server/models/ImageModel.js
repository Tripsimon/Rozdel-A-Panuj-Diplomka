const mongoose = require('mongoose');

//Schéma pro obrázek
const ImageSchema = mongoose.Schema({
    name: String
})

module.exports = ImageModel = mongoose.model("ImageModel",ImageSchema,"PozadiKolekce")