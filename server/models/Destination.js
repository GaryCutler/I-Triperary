const { Schema, model } = require("mongoose");

const destinationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  activities: [
    {
      name: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const Destination = model('Destination', destinationSchema);

module.exports = Destination;
