const {Schema, model} = require('mongoose');

const cartSchema = new Schema(
    {productid: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity:{
        type:Int32("1"),
        required:true,
    },
    total:{
        type:Float32("0.00"),
        required:true,
    },},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

module.exports = cartSchema;

