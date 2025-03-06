const express = require("express");
const programController = require("../controllers/programController");

const programRoutes = express.Router();

programRoutes.get("/", programController.getAllProgram);
programRoutes.get("/:id", programController.getProgramById);
programRoutes.post("/", programController.createProgram);
programRoutes.put("/:id", programController.updateProgram);
programRoutes.delete("/:id", programController.deleteProgram);

module.exports = programRoutes;
