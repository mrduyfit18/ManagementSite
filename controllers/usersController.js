const formidable = require('formidable');
const fs = require('fs');
const admin = require("firebase-admin");
const uuid = require('uuid-v4');

const usersModel = require('../models/usersModel');

const adminAccount = require('../storageserver-b4fd7-firebase-adminsdk-o7qpl-3939aaef50.json');

// admin.initializeApp({
//     credential: admin.credential.cert(adminAccount),
//     storageBucket: 'gs://storageserver-b4fd7.appspot.com/'
// });

//const bucket = admin.storage().bucket();

async function uploadFile(filePath, fileInfo) {

    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: fileInfo.type,
        cacheControl: 'public, max-age=31536000',
    };

    // Uploads a local file to the bucket
    const fileName = filePath.split('/').pop();
    await bucket.upload(filePath,{
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        destination: 'avatars/' + fileName,
        gzip: true,
        metadata: metadata,
    });
}


exports.edit = async (req, res, next) => {
    const account = await usersModel.getAccount(await req.params.id);
    res.render('user', {account});

}

exports.listindex = async (req, res, next) => {
    const accounts = await usersModel.getFullAccounts();
    res.render('userslist', {accounts});

}

exports.saveProfileChange = async (req, res, next) => {
    const form = formidable({ multiples: true });
    let newPath;
    console.log(req.params.id);
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if(files.avatar.name && files.avatar.type.includes('image') && files.avatar.size>0) {
            const res = files.avatar.name.split('.').pop();
            newPath  = files.avatar.path + '.' + res;
            fs.rename(files.avatar.path, newPath,() => {
                uploadFile(newPath, files.avatar).then();
            });
        }
        usersModel.SaveProfileChange(fields, newPath, req.params.id).then(res.redirect('/'));
    });
}

