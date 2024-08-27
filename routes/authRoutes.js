const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController"); // Ensure this path is correct

// Create router object
const router = express.Router();

// Routes
// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// LOGOUT
router.post("/logout", logoutController);

module.exports = router;
