const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotTime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SlotTime",
    required: true,
  },
  class: { type: String },
  trainer: { type: String },
  review: {
    reviewText: { type: String, trim: true, default: "" },
    rating: { type: Number, min: 1, max: 5 },
  },
  reviewStatus: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["Booked", "Completed", "Cancelled"],
    default: "Booked",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
