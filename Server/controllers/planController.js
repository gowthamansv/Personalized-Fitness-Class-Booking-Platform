const Plan = require("../models/plan");

const planController = {
  getAllPlan: async (req, res) => {
    try {
      const plans = await Plan.find();
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getPlanById: async (req, res) => {
    try {
      const plan = await Plan.findById(req.params.id);
      if (!plan) return res.status(404).json({ message: "Plan not found" });
      res.status(200).json(plan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createPlan: async (req, res) => {
    try {
      const { title, description, features, price, duration } = req.body;
      const newPlan = new Plan({
        title,
        description,
        features,
        price,
        duration,
      });
      await newPlan.save();
      res.status(201).json(newPlan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updatePlan: async (req, res) => {
    try {
      const plan = await Plan.findById(req.params.id);
      if (!plan) return res.status(404).json({ message: "Plan not found" });

      if (req.body.title) plan.title = req.body.title;
      if (req.body.description) plan.description = req.body.description;
      if (req.body.price) plan.price = req.body.price;
      if (req.body.duration) plan.duration = req.body.duration;

      if (req.body.features) {
        const newFeatures = Array.isArray(req.body.features)
          ? req.body.features
          : [req.body.features];
        plan.features.push(...newFeatures); // Append new features without removing old ones
      }

      await plan.save();
      res.status(200).json(plan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deletePlan: async (req, res) => {
    try {
      const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
      if (!deletedPlan)
        return res.status(404).json({ message: "Plan not found" });
      res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = planController;
