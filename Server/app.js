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

app.use(
  cors({
    origin: "https://personalized-fitness-class-booking-pl.netlify.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://personalized-fitness-class-booking-pl.netlify.app/"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use("/user", userRoutes);
app.use("/trainer", trainerRoutes);
app.use("/slottime", slottimeRoutes);
app.use("/booking", bookingRoutes);
app.use("/plan", planRoutes);
app.use("/program", programRoutes);
app.use("/payment", paymentRoutes);

module.exports = app;
