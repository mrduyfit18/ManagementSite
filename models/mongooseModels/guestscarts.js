const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cart = new Schema({
        listProducts: [
            {
                productID: { type: Schema.Types.ObjectId, ref: 'Product' },
                number: Number
            }
        ],
        dateCreated: Schema.Types.Date         //Index to auto delete a doc after 3 days
    },
    {versionKey: false}
);

module.exports = mongoose.model('Guestscarts', cart);