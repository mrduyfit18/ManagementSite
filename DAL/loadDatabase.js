
//const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;


// Connection URI
const uri = 'mongodb+srv://mrduyfit:Ptudw1831@web.znmrk.mongodb.net/data?retryWrites=true&w=majority' //process.env.URI;

// Create a new MongoClient
//const client = new MongoClient(uri, {useUnifiedTopology: true});
//let db;
async function Connect() {
    try {
        // Connect the client to the server

        await mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser:true});
        //b = await client.db('data');
        console.log('Successfully connected');


    }
    finally {

    }
}

module.exports ={Connect};