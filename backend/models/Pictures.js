const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const picturesSchema = mongoose.Schema({
    userId: { type: String, required: true },
    datenow: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    comment: { type: String, required: true },
})


module.exports = mongoose.model('Pictures', picturesSchema);


