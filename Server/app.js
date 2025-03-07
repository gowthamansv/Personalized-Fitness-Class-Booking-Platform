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
  "http://localhost:5173", // Local dev frontend
  "https://personalized-fitness-class-booking-pl.netlify.app/", // Production frontend URL
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

app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://personalized-fitness-class-booking-pl.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.options("*", cors());

console.log("Request Origin:", req.headers.origin);

app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/trainer", trainerRoutes);
app.use("/slottime", slottimeRoutes);
app.use("/booking", bookingRoutes);
app.use("/plan", planRoutes);
app.use("/program", programRoutes);
app.use("/payment", paymentRoutes);

module.exports = app;
