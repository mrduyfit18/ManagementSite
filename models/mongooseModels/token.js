const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const token = new Schema({
        token: String,
        date: Date
    },
    {versionKey: false}
);

module.exports = mongoose.model('Token', token);