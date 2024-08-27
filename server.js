const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middelwares/errorMiddleware"); // Corrected typo in "middlewares"

// Load environment variables
dotenv.config();

// MongoDB connection
connectDB();

// Create Express app
const app = express();

// Middleware setup
app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Import and use routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE || "development"} mode on port ${PORT}`.bgCyan.white
  );
});
