const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Plan Title
  description: { type: String, required: true }, // Plan Description
  features: [{ type: String, required: true }], // List of Features
  price: { type: Number, required: true }, // Price in ₹
  duration: { type: String, default: "Month", enum: ["Month", "year"] }, // Billing Cycle
});

module.exports = mongoose.model("Plan", planSchema);
