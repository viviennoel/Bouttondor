const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const dressesSchema = mongoose.Schema({
    userId: { type: String, required: true },
    datenow: { type: Number, required: true },
    shoulder: { type: String, required: true },
    style: { type: String, required: true },
    back: { type: String, required: true },
    color: { type: String, required: true },
    fabric: { type: String, required: true },
})


module.exports = mongoose.model('Dresses', dressesSchema);