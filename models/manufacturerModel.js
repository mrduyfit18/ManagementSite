const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Manufacturers = require('./mongooseModels/manufacturers');

exports.list = async () => {
    return Manufacturers.find({});
}

exports.add = async (name, logo) => {
    const fileName = logo.split('/').pop();
    const newPath = process.env.GClOUD_BRAND_FOlDER + fileName + '?alt=media';
    return Manufacturers.create({name: name, logo: newPath});
}