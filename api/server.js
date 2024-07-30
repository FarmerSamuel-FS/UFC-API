const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

const PORT = process.env.PORT || 8000;

// Import routes
const fighterRouter = require("./routes/fighters");
const authRouter = require("./routes/auth");

// Database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established"));

// Middleware to parse JSON requests
app.use(express.json());

// Define API routes
app.use("/api/v1/fighters", fighterRouter);
app.use("/api/v1/auth", authRouter);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, "../reactjs/build")));

// Handle any other routes by serving the React app's index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
