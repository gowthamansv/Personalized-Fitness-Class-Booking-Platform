const userController = require("../controllers/userController");
const auth = require("../utils/auth");
const express = require("express");

const userRoutes = express.Router();

userRoutes.get(
  "/userdetails",
  auth.isUserAuthenticated,
  userController.userdetails
);
userRoutes.get("/checkpayment", userController.getByToken);
userRoutes.get("/", userController.getAllUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.post("/register", userController.createUser);
userRoutes.put("/", auth.isUserAuthenticated, userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", userController.logout);
userRoutes.post("/forgotpassword", userController.forgotpassword);
userRoutes.post("/resetpassword/:token", userController.resetpassword);

module.exports = userRoutes;
