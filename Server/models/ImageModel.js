const mongoose = require('mongoose');

//Schéma pro obrázek
const ImageSchema = mongoose.Schema({
    name: String
})

module.exports = ImageModel = mongoose.model("db_rozdel_a_panuj_backgrounds",ImageSchema,"backgrounds")