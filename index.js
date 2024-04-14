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

// Import helper functions
const { Authorization } = require("./routes/authHelper");
const { Redirect, getUserProfile } = require("./routes/authHelper");

// Allow requests from all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define routes
app.use("/api", authRoute);
app.use("/api/users", userRoute);
app.use("/api/internships", internshipRoute);
app.use("/api/bookmarks", bookMarkRoute);

// LinkedIn Authorization URL
app.get('/api/linkedin/authorize', (req, res) => {
  return res.redirect(Authorization());
});

// LinkedIn Redirect URL
app.get('/api/linkedin/redirect', async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await Redirect(code);
    const accessToken = tokenResponse.access_token;

    // Retrieve user profile using the access token
    const userProfile = await getUserProfile(accessToken);

    // You can handle the user profile data as needed, for example, saving it to the database or returning it as a response
    return res.json(userProfile);
  } catch (error) {
    // Handle errors appropriately
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
