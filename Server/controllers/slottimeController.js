const SlotTime = require("../models/slottime");
const Trainer = require("../models/trainer");

const slottimeController = {
  topost: async (req, res) => {
    try {
      const trainer = req.trainerId;

      const { date, starttime, endtime } = req.body;
      const isValid = await Trainer.findById(trainer);

      if (!isValid) {
        return res.status(400).json({ message: "Trainer does not exist" });
      }
      const existingSlot = await SlotTime.findOne({
        trainer,
        date,
        starttime,
        endtime,
      });

      if (existingSlot) {
        return res
          .status(400)
          .json({ message: "Slot with this date and time already exists." });
      }
      const slot = new SlotTime({
        trainer,
        date,
        starttime,
        endtime,
      });
      await slot.save();
      res.status(201).json(slot);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllSlot: async (req, res) => {
    try {
      const slots = await SlotTime.find();
      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getSlotByTrainer: async (req, res) => {
    try {
      const { id } = req.body;

      const slot = await SlotTime.find({ trainer: id }).populate("trainer");

      res.status(200).json(slot);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = slottimeController;
