const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const typeCategory = new Schema({
    _id: ObjectId,
    name: String
});

module.exports = mongoose.model('Catalog', typeCategory);