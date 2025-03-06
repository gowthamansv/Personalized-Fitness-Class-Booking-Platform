const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  para: { type: String, required: true },
  src: { type: String, required: true },
});

module.exports = mongoose.model("Program", programSchema);
