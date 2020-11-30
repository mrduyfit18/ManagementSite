const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;
// Connection URI
const uri ='mongodb+srv://mrduyfit:Ptudw1831@web.znmrk.mongodb.net/data?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });
let db;
async function run() {
    try {
        // Connect the client to the server
        if(!client.isConnected()){
            await client.connect();
            db = await client.db('data');
            console.log('Successfully connected');
        }

    }
    finally {
    }
}

run().then();


const database = () => db;

module.exports.database = database;
