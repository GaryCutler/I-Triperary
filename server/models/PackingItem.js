const { Schema, model } = require('mongoose');

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

const PackingItem = model('PackingItem', packingItemSchema);

module.exports = PackingItem;