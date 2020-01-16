const mongoose = require("mongoose");
const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hashtag: { type: String, required: true },
  city_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("itinerary", itinerarySchema);
