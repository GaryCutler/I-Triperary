const { Schema } = require('mongoose');

const packingItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    packed: {
        type: Boolean,
        required: true,
    },
});

module.exports = packingItemSchema;