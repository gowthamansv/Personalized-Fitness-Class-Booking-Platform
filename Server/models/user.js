const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true, select: false },
    weight: { type: Number },
    height: { type: Number },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    caloriesIntake: { type: Number },
    bmi: { type: Number },
    role: { type: String, default: "User" },
    isPaid: { type: Boolean, default: false },
    plan: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.weight && this.height) {
    const heightInMeters = this.height / 100; // Convert cm to meters
    this.bmi = this.weight / (heightInMeters * heightInMeters);
  }
  next();
});

module.exports = mongoose.model("User", userSchema, "Users");
