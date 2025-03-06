const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isPaid: { type: Boolean, required: true },
  amount: { type: Number, required: true },
  razorpay: {
    order_id: { type: String, required: true },
    payment_id: { type: String, required: true },
    signature: { type: String, required: true },
  },
});

module.exports = mongoose.model("Order", orderScheme, "Orders");
