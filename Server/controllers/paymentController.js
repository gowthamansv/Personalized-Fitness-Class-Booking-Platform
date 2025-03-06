const Order = require("../models/order");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Razorpay = require("razorpay");

const paymentController = {
  createOrder: async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      console.log(req.body);
      const options = req.body;
      const order = await instance.orders.create(options);
      if (!order) {
        return res.status(500).json({ message: "Some error occurred" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  payOrder: async (req, res) => {
    try {
      const {
        plan,
        amount,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      } = req.body;
      const token = req.headers.authorization?.split(" ")[1]; // for Website
      // console.log(token);
      // const token = req.cookies.token; // for Postman
      if (!token) {
        res.status(401).json({ message: "Unautherized" });
      }
      const decoded = jwt.verify(token, process.env.KEY_USER);
      const userId = decoded.id;
      // console.log(userId);

      const user = await User.findById(userId);
      // console.log(user);
      if (!user) {
        res.status(500).json({ message: "User not found login again" });
      }
      user.isPaid = true; // Update the field
      user.plan = plan;
      await user.save();
      const newOrder = Order.create({
        userId: user.id,
        isPaid: true,
        amount: amount,
        razorpay: {
          order_id: razorpayOrderId,
          payment_id: razorpayPaymentId,
          signature: razorpaySignature,
        },
      });

      res.status(200).json({ message: "payment was successfull" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  paymentOrder: async (req, res) => {},
};

module.exports = paymentController;
