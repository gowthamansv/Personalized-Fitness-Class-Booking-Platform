const express = require("express");
const planController = require("../controllers/planController");

const planRoutes = express.Router();

planRoutes.get("/", planController.getAllPlan);
planRoutes.get("/:id", planController.getPlanById);
planRoutes.post("/", planController.createPlan);
planRoutes.put("/:id", planController.updatePlan);
planRoutes.delete("/:id", planController.deletePlan);

module.exports = planRoutes;
