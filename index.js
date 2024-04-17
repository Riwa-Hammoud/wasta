const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const internshipRoute = require("./routes/internship");
const bookMarkRoute = require("./routes/bookmark");


// Allow requests from all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

const { Authorization, Redirect, getUserProfile } = require('./authHelper');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define routes
app.use("/api", authRoute);
app.use("/api/users", userRoute);
app.use("/api/internships", internshipRoute);
app.use("/api/bookmarks", bookMarkRoute);


// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
