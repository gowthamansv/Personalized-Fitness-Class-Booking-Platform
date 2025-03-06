const Trainer = require("../models/trainer");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const trainerController = {
  getAllTrainer: async (req, res) => {
    try {
      const trainers = await Trainer.find();
      res.status(200).json(trainers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getTrainerById: async (req, res) => {
    try {
      const { id } = req.params;
      const trainer = await Trainer.findById(id);
      res.status(200).json(trainer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createTrainer: async (req, res) => {
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
        experience,
        qualification,
        specialization,
        availability,
        socialMedia,
      } = req.body;
      const trainerExist = await Trainer.findOne({ email: email });

      if (trainerExist) {
        return res.status(400).json({ message: "Trainer already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newTrainer = new Trainer({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        weight,
        height,
        age,
        gender,
        experience,
        qualification,
        specialization,
        availability,
        socialMedia,
      });
      await newTrainer.save();
      res.status(201).json(newTrainer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateTrainer: async (req, res) => {
    try {
      const id = req.trainerId;
      console.log(id);
      console.log("hi1");
      const trainer = await Trainer.findById(id);
      if (!trainer) {
        return res.status(404).json({ message: "Trainer not found" });
      }
      Object.assign(trainer, req.body);
      await trainer.save();
      res.status(200).json({ message: "Updated sucessfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteTrainer: async (req, res) => {
    try {
      const { id } = req.params;
      const trainer = await Trainer.findByIdAndDelete(id);
      if (!trainer) {
        return res.status(400).json({ message: "Trainer not found" });
      }
      res.status(200).json({ message: "Deleted sucessfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const trainerExist = await Trainer.findOne({ email: email }).select(
        "email password"
      );

      if (!trainerExist) {
        return res.status(404).json({ message: "Trainer does not exist" });
      }

      const passwordIsValid = await bcrypt.compare(
        password,
        trainerExist.password
      );

      if (!passwordIsValid) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      const token = jwt.sign({ id: trainerExist.id }, process.env.KEY_TRAINER);

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
  trainerdetails: async (req, res) => {
    try {
      const trainerId = req.trainerId;

      const trainer = await Trainer.findById(trainerId).select(
        "-password -__v -createdAt -updatedAt -_id"
      );

      res.status(200).json(trainer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  forgotpassword: async (req, res) => {
    const { email } = req.body;

    try {
      const trainer = await Trainer.findOne({ email });
      if (!trainer) {
        return res.status(404).json({ message: "Trainer not found" });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpiry = Date.now() + 3600000; // valid for 1 hour
      await trainer.save();

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
      const trainer = await Trainer.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });
      if (!trainer) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      trainer.password = hashedPassword;
      trainer.resetToken = null;
      trainer.resetTokenExpiry = null;
      await trainer.save();
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  trainerVideo: async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
      if (!bucket) {
        return res.status(500).json({ error: "Database connection not ready" });
      }

      const readableStream = new Readable();
      readableStream.push(req.file.buffer);
      readableStream.push(null);

      const uploadStream = bucket.openUploadStream(req.file.originalname);

      readableStream.pipe(uploadStream);

      uploadStream.on("finish", () => {
        res
          .status(201)
          .json({ message: "Upload success", fileId: uploadStream.id });
      });

      uploadStream.on("error", (err) => {
        res.status(500).json({ error: "Upload failed", details: err.message });
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  },
};

module.exports = trainerController;
