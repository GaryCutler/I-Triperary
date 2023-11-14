const { Schema, model } = require('mongoose');

const packingListSchema = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PackingItem',
        },
    ],
});

const PackingList = model('PackingList', packingListSchema);

module.exports = PackingList;