const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const order = new Schema({
        user_id: { type: Schema.Types.ObjectId, ref: 'Account' },
        status: String,
        dateModified: Schema.Types.Date,
        contact_id: { type: Schema.Types.ObjectId, ref: 'Contact' },
        totalCost: Number
    },
    {versionKey: false}
);

order.virtual('listProducts', {
    ref: 'Ordersdetail',
    localField: '_id',
    foreignField: 'order_id',

});
order.set('toObject', { virtuals: true });
order.set('toJSON', { virtuals: true });


module.exports = mongoose.model('Order', order);