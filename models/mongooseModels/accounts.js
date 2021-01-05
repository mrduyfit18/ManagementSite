const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');


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
Account.plugin(mongoosePaginate);
module.exports = mongoose.model('Account', Account);