const User = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findById(id);
      if (!users) {
        res.status(404).json({ message: "User not found." });
      }
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const {
        name,
        email,
        phoneNumber,
        password,
        weight,
        height,
        age,
        gender,
        caloriesIntake,
      } = req.body;

      const userExist = await User.findOne({ email: email });

      if (userExist) {
        return res.status(400).json({ message: "User already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        weight,
        height,
        age,
        gender,
        caloriesIntake,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      Object.assign(user, req.body);
      await user.save();
      res.status(200).json({ message: "User details updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({ email: email }).select(
        "email password"
      );

      if (!userExist) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const passwordIsValid = await bcrypt.compare(
        password,
        userExist.password
      );

      if (!passwordIsValid) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      const token = jwt.sign({ id: userExist.id }, process.env.KEY_USER);

      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({
        message: "Login successfully",
        token, // Send token in the response
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout sucessfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  userdetails: async (req, res) => {
    try {
      const userId = req.userId;

      const user = await User.findById(userId).select(
        "-password -__v -createdAt -updatedAt -_id"
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  forgotpassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpiry = Date.now() + 3600000; // valid for 1 hour
      await user.save();

      const resetLink = `https://password-reset-03.netlify.app/resetpassword/${resetToken}`;

      // Use sendEmail utility
      await sendEmail(email, resetLink);

      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  resetpassword: async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getByToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // for Website
      // console.log(token);
      // const token = req.cookies.token; // for Postman
      if (!token) {
        res.status(401).json({ message: "Unautherized , please login" });
      }
      const decoded = jwt.verify(token, process.env.KEY_USER);
      const userId = decoded.id;
      // console.log(userId);

      const user = await User.findById(userId);
      // console.log(user);
      if (!user) {
        res.status(500).json({ message: "User not found login again" });
      }
      // console.log(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
