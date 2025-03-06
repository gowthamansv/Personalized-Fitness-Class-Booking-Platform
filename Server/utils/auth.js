const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = {
  isUserAuthenticated: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // for Website
      // const token = req.cookies.token; // for Postman
      if (!token) {
        res.status(401).json({ message: "Unautherized11" });
      } else {
        const decoded = jwt.verify(token, process.env.KEY_USER);
        req.userId = decoded.id;
        next();
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  isTrainerAuthenticated: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // for website
      // const token = req.cookies.token; // for Postman

      if (!token) {
        res.status(401).json({ message: "Unautherized" });
      } else {
        const decoded = jwt.verify(token, process.env.KEY_TRAINER);

        req.trainerId = decoded.id;
        next();
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = auth;
