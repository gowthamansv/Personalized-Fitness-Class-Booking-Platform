const Booking = require("../models/booking");
const SlotTime = require("../models/slottime");
const User = require("../models/user");
const Trainer = require("../models/trainer");
const mongoose = require("mongoose");
const sendClass = require("../utils/sendClass");

const bookingController = {
  tobook: async (req, res) => {
    try {
      const { slotId } = req.body;
      const userId = req.userId;

      const user = await User.findById(userId);
      const slot = await SlotTime.findById(slotId).populate("trainer");
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      if (!slot) {
        return res.status(400).json({ message: "Slot does not exist" });
      }

      const existingSlot = await Booking.findOne({
        user: userId,
        slotTime: slotId,
      });

      if (existingSlot) {
        return res.status(400).json({ message: "Slot is already Booked." });
      }
      // Update slot as booked
      await SlotTime.findByIdAndUpdate(slotId, { isBooked: true });

      // Create a booking
      const booking = new Booking({
        user: userId,
        slotTime: slotId,
        class: slot.trainer.specialization,
        trainer: slot.trainer.name,
      });
      await booking.save();

      const email = user.email;
      const classDetails = {
        name: user.name,
        className: slot.trainer.specialization,
        slotDate: slot.date,
        stime: slot.starttime,
        etime: slot.endtime,
        trainerName: slot.trainer.name,
      };

      await sendClass(email, classDetails);

      res.status(201).json({ message: "Slot booked successfully", booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getByUser: async (req, res) => {
    try {
      const userId = req.userId;
      const slot = await Booking.find({ user: userId })
        .populate("user")
        .populate("slotTime");
      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getBytrainer: async (req, res) => {
    try {
      const trainerId = req.trainerId;
      const trainer = await Trainer.findById(trainerId);
      const classDetails = await Booking.find({ trainer: trainer.name })
        .populate("user")
        .populate("slotTime");
      res.status(200).json(classDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const trainerId = req.trainerId;

      const { slotTime, status } = req.body;

      if (!trainerId) {
        return res.status(400).json({ message: "Trainer ID is missing" });
      }

      const classDetails = await Booking.findOne({
        slotTime: slotTime,
      });

      if (!classDetails) {
        return res.status(404).json({ message: "Class details not found" });
      }

      classDetails.status = status;

      await classDetails.save();

      res.status(200).json({ message: "Class status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateReview: async (req, res) => {
    const userId = req.userId;
    if (!userId) return res.status(500).json({ message: "user not found" });
    const { id, reviewText, rating } = req.body;
    const updatedClass = await Booking.findById(id);

    if (updatedClass.reviewStatus)
      return res.status(500).json({ message: "already gave feedback" });
    if (!updatedClass) {
      return res.status(500).json({ message: "class not found" });
    }
    updatedClass.review.reviewText = reviewText;
    updatedClass.review.rating = rating;
    updatedClass.reviewStatus = true;
    await updatedClass.save();
    res
      .status(200)
      .json({ message: "Review updated successfully", updatedClass });
  },
  deleteBooking: async (req, res) => {
    try {
      const userId = req.userId;
      const { id, slotTimeId } = req.body; // ✅ Extract from body

      if (!id || !slotTimeId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Convert string to ObjectId
      const objectId = new mongoose.Types.ObjectId(id);

      // Delete booking from database
      const deletedBooking = await Booking.findByIdAndDelete(objectId);

      if (!deletedBooking)
        return res.status(404).json({ message: "class not found" });

      const slot = await SlotTime.findById(slotTimeId);

      if (!slot) return res.status(404).json({ message: "slot not found" });

      slot.isBooked = false;

      await slot.save();

      res.status(200).json({ message: "class deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = bookingController;
