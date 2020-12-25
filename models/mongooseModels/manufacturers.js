const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const manufacturer = new Schema({
    _id: ObjectId,
    name: String
});

module.exports = mongoose.model('Manufacturer', manufacturer);