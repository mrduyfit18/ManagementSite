const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
//const bcrypt = require('bcrypt');
const ObjectId = mongoose.Types.ObjectId;

const Accounts = require('./mongooseModels/accounts');



exports.getAccount = (id) =>{
    return Accounts.findOne({'_id': ObjectId(id)});
}

exports.getFullAccounts = async () =>{
    return Accounts.find({});
}


exports.SaveProfileChange = async (fields, avatarLocal, id) => {
    const fileName = avatarLocal.split('/').pop();
    const avatarPath = process.env.GClOUD_IMAGE_FOlDER + fileName + '?alt=media'
    await Accounts.updateOne({_id: ObjectId(id)},{'name': fields.name, avatar: avatarPath});
}
