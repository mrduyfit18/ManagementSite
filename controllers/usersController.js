const formidable = require('formidable');
const fs = require('fs');
const admin = require("firebase-admin");
const uuid = require('uuid-v4');

const usersModel = require('../models/usersModel');
const imageService = require('../services/images');


exports.edit = async (req, res, next) => {
    const account = await usersModel.getAccount(await req.params.id);
    if (res.locals.user._id.toString()!== req.params.id)
    {
        res.render('user', {account});
    }
    else
    {
        const admin = 1;
        res.render('user', {admin});
    }


}

exports.listindex = async (req, res, next) => {
    const page = req.query.page;
    const pagination = await usersModel.getFullAccounts(page);
    res.render('userslist', {pagination});

}

exports.saveProfileChange = async (req, res, next) => {
    const form = formidable({ multiples: true });
    let newPath;
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if(files.avatar.name && files.avatar.type.includes('image') && files.avatar.size>0) {
            const res = files.avatar.name.split('.').pop();
            newPath  = files.avatar.path + '.' + res;
            await fs.rename(files.avatar.path, newPath, () => {});
            await imageService.uploadImage(newPath, files.avatar, 'avatar/')
        }
       await usersModel.SaveProfileChange(fields, newPath, req.params.id).then(res.redirect('/'));
    });
}

exports.block = async (req, res, next) => {
    const userID = req.params.id;
    await usersModel.BlockUser(userID);
    res.send('1');
}

exports.unblock = async (req, res, next) => {
    const userID = req.params.id;
    await usersModel.UnblockUser(userID);
    res.send('2');
}

