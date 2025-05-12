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
app.use(express.json());
const allowedOrigins = [
  "https://personalized-fitness-class-booking-pl.netlify.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies or other credentials
  })
);
app.options("*", cors());
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://personalized-fitness-class-booking-pl.netlify.app"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/slottime", slottimeRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/plan", planRoutes);
app.use("/api/program", programRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;
