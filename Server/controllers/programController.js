const Program = require("../models/program");

const planController = {
  getAllProgram: async (req, res) => {
    try {
      const program = await Program.find();
      res.status(200).json(program);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProgramById: async (req, res) => {
    try {
      const program = await Program.findById(req.params.id);
      if (!program)
        return res.status(404).json({ message: "Program not found" });
      res.status(200).json(program);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createProgram: async (req, res) => {
    try {
      const { title, para, src } = req.body;
      const newProgram = new Program({ title, para, src });
      await newProgram.save();
      res.status(201).json(newProgram);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateProgram: async (req, res) => {
    try {
      const updatedProgram = await Program.findById(req.params.id);
      if (!updatedProgram)
        return res.status(404).json({ message: "Program not found" });
      Object.assign(updatedProgram, req.body);
      await program.save();
      res.status(200).json(updatedProgram);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteProgram: async (req, res) => {
    try {
      const deletedProgram = await Program.findByIdAndDelete(req.params.id);
      if (!deletedProgram)
        return res.status(404).json({ message: "Program not found" });
      res.status(200).json({ message: "Program deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = planController;
