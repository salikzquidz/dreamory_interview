const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    // required: true,
    enum: ["event", "technology", "crypto", "social", "tournament", "dinner"],
    default: ["event", "technology"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Coming Soon", "Ongoing", "Completed", "Cancelled"],
    default: "Coming Soon",
  },
  numberOfParticipants: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now(),
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
