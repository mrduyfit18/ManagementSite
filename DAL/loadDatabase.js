
//const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;


// Connection URI
const uri = process.env.DB_URI //process.env.URI;

// Create a new MongoClient
//const client = new MongoClient(uri, {useUnifiedTopology: true});
//let db;
async function Connect() {
    try {
        // Connect the client to the server

        await mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser:true, useFindAndModify: false});
        //b = await client.db('data');
        console.log('Successfully connected');


    }
    finally {

    }
}

module.exports ={Connect};