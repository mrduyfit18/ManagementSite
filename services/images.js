const admin = require("firebase-admin");
const uuid = require('uuid-v4');

const adminAccount = require('../storageserver-b4fd7-firebase-adminsdk-o7qpl-3939aaef50.json');

admin.initializeApp({
        credential: admin.credential.cert(adminAccount),
        storageBucket: process.env.GCLOUD_BUCKET
    }
);

const bucket = admin.storage().bucket();

exports.uploadImage = async (filePath, fileInfo) => {

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

exports.deleteImage = async (filePath) => {
    let filename = filePath.split('/').pop().replace('%2F','/').replace('?alt=media','');
    const file = bucket.file(filename);
    await file.delete();
}