const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const detail = new Schema({
        product_id: ObjectId,
        order_id: {type: Schema.Types.ObjectId, ref: 'Order' },
        number: Number
    },
    {versionKey: false}
);

detail.virtual('productID', {
    ref: 'Product',
    localField: 'product_id',
    foreignField: '_id',
    justOne: true

});
detail.set('toObject', { virtuals: true });
detail.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ordersdetail', detail);