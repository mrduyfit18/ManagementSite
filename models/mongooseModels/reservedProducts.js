//Dùng để lưu trữ những sản phẩm mua sau cho 1 khách hàng

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema({
        product_id: {type: Schema.Types.ObjectId, ref: 'Product' },
        user_id: {type: Schema.Types.ObjectId, ref: 'Account' }
    },
    {versionKey: false}
);


module.exports = mongoose.model('Reservedproduct', product);