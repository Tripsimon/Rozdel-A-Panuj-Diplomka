const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    name: String
})

module.exports = ImageModel = mongoose.model("ImageModel",ImageSchema,"PozadiKolekce")