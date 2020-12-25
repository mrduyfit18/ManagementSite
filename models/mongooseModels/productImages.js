const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const image = new Schema({
    _id: ObjectId,
    path: String,
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' }
    },
    {versionKey: false}
);

module.exports = mongoose.model('Image', image);