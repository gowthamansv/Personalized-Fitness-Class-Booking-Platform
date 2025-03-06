const express = require("express");
const bookingController = require("../controllers/bookingController");
const auth = require("../utils/auth");

const bookingRoutes = express.Router();

bookingRoutes.post("/", auth.isUserAuthenticated, bookingController.tobook);
bookingRoutes.get(
  "/user",
  auth.isUserAuthenticated,
  bookingController.getByUser
);
bookingRoutes.get(
  "/trainer",
  auth.isTrainerAuthenticated,
  bookingController.getBytrainer
);
bookingRoutes.put(
  "/updatereview",
  auth.isUserAuthenticated,
  bookingController.updateReview
);
bookingRoutes.put(
  "/updatestatus",
  auth.isTrainerAuthenticated,
  bookingController.updateStatus
);

bookingRoutes.delete(
  "/delete",
  auth.isUserAuthenticated,
  bookingController.deleteBooking
);

module.exports = bookingRoutes;
