const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Define user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Password length should be at least 5 characters long"],
  },
  customerId: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password method
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Sign JWT and handle tokens
userSchema.methods.getSignedToken = function (res) {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets are not defined in environment variables');
  }

  const accessExpireIn = parseInt(process.env.JWT_ACCESS_EXPIREIN, 10) || '1h';
  const refreshExpireIn = parseInt(process.env.JWT_REFRESH_EXPIREIN, 10) || '7d';

  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: accessExpireIn }
  );

  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: refreshExpireIn }
  );

  res.cookie("refreshToken", refreshToken, {
    maxAge: 86400 * 7, // 7 days in seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set secure flag in production
  });

  return accessToken;
};

// Export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
