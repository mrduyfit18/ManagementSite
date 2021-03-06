const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const manufacturer = new Schema({
    name: String,
    logo: String
    },
    {versionKey: false}
);

module.exports = mongoose.model('Manufacturer', manufacturer);