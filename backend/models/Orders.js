const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ordersSchema = mongoose.Schema({
    userId: { type: String, required: true },
    datenow: { type: Number, required: true },
    price: { type: Number, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    comment: { type: String, required: true },
    status: { type: String, required: true },
})


module.exports = mongoose.model('Orders', ordersSchema);


