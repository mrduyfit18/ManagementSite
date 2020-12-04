const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    _id: ObjectId,
    name: String,
    manufacturer: String,
    cover: String,
    basePrice: Number,
    type: String,
    shortSpecs: {type:  new Schema({
            shortCPU: String,
            shortDisplay: String,
            shortOS:String
        })
    },
    OS: String,
    display: String,
    processor: String,
    memory: String,
    storage: String,
    graphics: String,
    ethernet: String,
    wireless: String,
    audio: String,
    power: String,
    slogan: String
})

module.exports = mongoose.model('Product', Product);