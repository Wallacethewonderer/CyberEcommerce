const {Schema, model} = require('mongoose');

const imageSchema = new Schema(
    {
        location: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

module.exports = imageSchema;
