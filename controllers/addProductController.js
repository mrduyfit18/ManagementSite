const productsModel = require('../models/productsModel');
const formidable = require('formidable');
const fs = require('fs');
const admin = require("firebase-admin");
const uuid = require('uuid-v4');

const adminAccount = require('../storageserver-b4fd7-firebase-adminsdk-o7qpl-3939aaef50.json');

admin.initializeApp({
    credential: admin.credential.cert(adminAccount),
    storageBucket: process.env.GCLOUD_BUCKET
});

const bucket = admin.storage().bucket();

exports.add = (req, res, next) => {
    res.render('add');
}

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
        destination: 'products/' + fileName,
        gzip: true,
        metadata: metadata,
    });
}

exports.SaveProduct = (req, res, next) => {
    const form = formidable({ multiples: true });
    let newPath;
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if(files.cover.name && files.cover.type.includes('image') && files.cover.size>0) {
            const res = files.cover.name.split('.').pop();
            newPath  = files.cover.path + '.' + res;
            fs.rename(files.cover.path, newPath,() => {
                uploadFile(newPath, files.cover).then();
            });
        }
        productsModel.AddProduct(fields, newPath).then(res.redirect('/'));
    });
}