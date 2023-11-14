const { Schema, model } = require('mongoose');
const packingItemSchema = require('./PackingItem');

const packingListSchema = new Schema({
    items: [packingItemSchema],
});

const PackingList = model('PackingList', packingListSchema);

module.exports = PackingList;