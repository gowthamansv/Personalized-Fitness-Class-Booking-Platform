const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true, select: false }, // Hidden by default in queries
    weight: { type: Number },
    height: { type: Number },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    experience: { type: Number, required: true },
    qualification: { type: String, required: true },
    specialization: {
      type: String,
      enum: [
        "yoga",
        "strength training",
        "cardio",
        "home workout",
        "weightlifting",
        "rehabilitation",
      ],
      required: true,
    },
    imageId: { type: mongoose.Schema.Types.ObjectId },
    socialMedia: {
      instagram: { type: String },
    },
    role: { type: String, default: "Trainer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema, "Trainers");
