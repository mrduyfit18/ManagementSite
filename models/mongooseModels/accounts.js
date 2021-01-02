const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const Account = new Schema({
    _id: ObjectId,
    email: String,
    name: String,
    password: String,
    type: String,
    avatar: String,
    status: String
},
{
        versionKey: false
});

module.exports = mongoose.model('Account', Account);