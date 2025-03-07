const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const slottimeRoutes = require("./routes/slottimeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const planRoutes = require("./routes/planRoutes");
const programRoutes = require("./routes/programRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
// app.use(express.json());
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://personalized-fitness-class-booking-pl.netlify.app/",
// ];

app.use(
  cors({
    origin: "https://personalized-fitness-class-booking-pl.netlify.app/", // Replace with your frontend URL
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://personalized-fitness-class-booking-pl.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/slottime", slottimeRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/program", programRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;
