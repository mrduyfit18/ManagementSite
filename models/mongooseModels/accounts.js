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

Account.virtual('contacts', {
    ref: 'Contact',
    localField: '_id',
    foreignField: 'user_id',

});

Account.virtual('reserves', {
    ref: 'Reservedproduct',
    localField: '_id',
    foreignField: 'user_id',
});

Account.set('toObject', { virtuals: true });
Account.set('toJSON', { virtuals: true });

Account.plugin(mongoosePaginate);
module.exports = mongoose.model('Account', Account);