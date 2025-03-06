const express = require("express");
const trainerController = require("../controllers/trainerController");
const auth = require("../utils/auth");

const trainerRoutes = express.Router();

trainerRoutes.get(
  "/trainerdetails",
  auth.isTrainerAuthenticated,
  trainerController.trainerdetails
);
trainerRoutes.get("/", trainerController.getAllTrainer);
trainerRoutes.get("/:id", trainerController.getTrainerById);
trainerRoutes.post("/register", trainerController.createTrainer);
trainerRoutes.put(
  "/",
  auth.isTrainerAuthenticated,
  trainerController.updateTrainer
);
trainerRoutes.delete("/:id", trainerController.deleteTrainer);
trainerRoutes.post("/login", trainerController.login);
trainerRoutes.post("/logout", trainerController.logout);
trainerRoutes.post("/forgotpassword", trainerController.forgotpassword);
trainerRoutes.post("/resetpassword/:token", trainerController.resetpassword);

module.exports = trainerRoutes;
