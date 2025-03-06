const mongoose = require("mongoose");

const slotTimeSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  starttime: { type: String, required: true }, // Format: HH:MM AM/PM
  endtime: { type: String, required: true }, // Format: HH:MM AM/PM
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model("SlotTime", slotTimeSchema, "SlotTimes");
