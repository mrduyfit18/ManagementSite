const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Types.ObjectId;

const Accounts = require('./mongooseModels/accounts');



exports.getAccount = (id) =>{
    return Accounts.findOne({'_id': ObjectId(id)});
}

exports.getFullAccounts = async (currentPage) =>{
    const currPage = currentPage || 1;
    return await Accounts.paginate( {}, {page: currPage, limit: 10});
}


exports.SaveProfileChange = async (fields, avatarLocal, id) => {
    if(avatarLocal) {
        const fileName = avatarLocal.split('/').pop();
        const avatarPath = process.env.GClOUD_AVATAR_FOlDER + fileName + '?alt=media'
        await Accounts.updateOne({_id: ObjectId(id)},{'name': fields.name, avatar: avatarPath});
    }
    else {
        await Accounts.updateOne({_id: ObjectId(id)}, {'name': fields.name});
    }
}

exports.Signin = async (email, password) =>{
    const account = await Accounts.findOne({email: email});
    /*if(account.password === req.body.password){
        return account;
    }
    else{
        return false;
    }*/
    if(!account){
        return 0;
    }
    let checkPassword = await bcrypt.compare(password, account.password);
    if(checkPassword){
        return account;
    }
    else{
        return -1;
    }
}

exports.BlockUser = async (userID) =>{
    await Accounts.updateOne({'_id': ObjectId(userID) }, {'$set':{'status': 'blocked'}});
}

exports.UnblockUser = async (userID) =>{
    await Accounts.updateOne({'_id': ObjectId(userID)}, {'$set':{'status': 'active'}});
}
