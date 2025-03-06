const express = require("express");
const slottimeController = require("../controllers/slottimeController");
const auth = require("../utils/auth");

const slottimeRoutes = express.Router();

slottimeRoutes.post(
  "/",
  auth.isTrainerAuthenticated,
  slottimeController.topost
);
slottimeRoutes.get("/", slottimeController.getAllSlot);
slottimeRoutes.post("/trainer", slottimeController.getSlotByTrainer);

module.exports = slottimeRoutes;
