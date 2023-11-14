const { Schema, model } = require('mongoose');

const itinerarySchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    destinations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Destination',
        },
    ],

    startDate: {
        type: Date,
        req: true,
    },
    endDate: {
        type: Date,
        req: true,
    },
    packingList: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'PackingList',
        }
    ],
});

const Itinerary = model('Itinerary', itinerarySchema);

module.exports = Itinerary;