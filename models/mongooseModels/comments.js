const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const  comment = new Schema({
    _id: ObjectId,
    name: String,
    product_id: ObjectId,
    content: String,
    date: Date
});

module.exports = mongoose.model('comment', comment);