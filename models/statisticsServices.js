const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const details = require('./mongooseModels/orderDetails');

exports.getTopProducts = async () => {
    return details.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: 'order_id',
                foreignField: '_id',
                as: 'info'
            }
        },
        {
            $match:{
                'info.status': {'$ne': 'cart'}
            }
        },
        {
            $group :
                {
                    _id : '$product_id',
                    'total': { $sum: '$number' }
                }
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'info'
            }
        },
        {
          $unwind: '$info'
        },
        {
            $sort : { 'total' : -1 }
        },
        {
            $limit : 10
        }
    ]);
}

exports.getStatisticByDay = async (date) => {
    return details.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: 'order_id',
                foreignField: '_id',
                as: 'info'
            }
        },
        {
            $unwind: '$info'
        },
        {
            $addFields: {
                dateString: {$dateToString: {format: '%m/%d/%Y', date: '$info.dateModified'}  }
            }
        },
        {
            $match:{
                'info.status': {'$ne': 'cart'},
                'dateString': {'$eq': date}
            }
        },
        {
            $group :
                {
                    _id : '$product_id',
                    'total': { $sum: '$number' },
                }
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'info'
            }
        },
        {
            $unwind: '$info'
        },
        {
            $addFields: {
                totalRevenue: { $sum: { $multiply: [ '$total', '$info.basePrice' ]  } }
            }
        }
    ]);
}

exports.getStatisticByTime = async (firstDate, lastDate) => {
    return details.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: 'order_id',
                foreignField: '_id',
                as: 'info'
            }
        },
        {
            $unwind: '$info'
        },
        {
            $match:{
                'info.status': {'$ne': 'cart'},
                'info.dateModified': {'$gte': firstDate, '$lt': lastDate}
            }
        },
        {
            $group :
                {
                    _id : '$product_id',
                    'total': { $sum: '$number' },
                }
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'info'
            }
        },
        {
            $unwind: '$info'
        },
        {
            $addFields: {
                totalRevenue: { $sum: { $multiply: [ '$total', '$info.basePrice' ]  } }
            }
        }
    ]);
}