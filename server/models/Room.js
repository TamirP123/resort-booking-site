const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
