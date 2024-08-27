const User = require("../models/userModel");
const JWT = require("jsonwebtoken");

// Register a new user
const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    // Create a new user
    user = await User.create({ username, email, password });
    
    // Generate JWT token
    const token = user.getSignedToken(res);
    
    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error. Please try again." });
  }
};

// Login user
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = user.getSignedToken(res);
    
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error. Please try again." });
  }
};

// Logout user
const logoutController = (req, res) => {
  // Clear the refresh token cookie
  res.cookie("refreshToken", "", { maxAge: 0 });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
