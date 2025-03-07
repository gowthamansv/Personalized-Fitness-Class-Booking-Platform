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

const allowedOrigins = [
  "http://localhost:5173", // Local dev frontend
  "https://personalized-fitness-class-booking-pl.netlify.app/", // Production frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/trainer", trainerRoutes);
app.use("/slottime", slottimeRoutes);
app.use("/booking", bookingRoutes);
app.use("/plan", planRoutes);
app.use("/program", programRoutes);
app.use("/payment", paymentRoutes);

module.exports = app;
