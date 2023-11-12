const { Schema, model, SchemaType } = require('mongoose');

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
    // TODO: Double check on the date 
    startDate: {
        type: Date,
        req: true,
    },
    endDate: {
        type: Date,
        req: true,
    },
    packingList: [packingListSchema],
});

const Itinerary = model('Itinerary', itinerarySchema);

module.exports = Itinerary;