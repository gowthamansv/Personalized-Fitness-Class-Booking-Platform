const express = require("express");
const paymentController = require("../controllers/paymentController");

const paymentRoutes = express.Router();

paymentRoutes.post("/", paymentController.createOrder);
paymentRoutes.post("/payorder", paymentController.payOrder);
paymentRoutes.get("/paymentorder", paymentController.paymentOrder);

module.exports = paymentRoutes;
