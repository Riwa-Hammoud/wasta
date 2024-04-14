const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user")
const internshipRoute = require("./routes/internship")
const bookMarkRoute = require("./routes/bookmark")
const cors = require('cors');
const { Authorization } = require("./routes/authHelper")
const express = require('express');
const router = express.Router();
const { Authorization, Redirect, getUserProfile } = require('../helpers/authHelper');


// Allow requests from all origins
app.use(cors());

// To allow requests only from specific origins:
// app.use(cors({
//     origin: 'http://your-flutter-app-domain.com'
// }));

dotenv.config();
// to get variables from .env file => process.env.VARIABLE_NAME

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('db connected'))
.catch((err)=> { console.log(err) });

app.use(express.json())     
app.use("/api/", authRoute)
app.use("/api/users", userRoute)
app.use("/api/internships", internshipRoute)
app.use("/api/bookmarks", bookMarkRoute)


// Authorization URL
router.get('/linkedin/authorize', (req, res) => {
    return res.redirect(Authorization());
});


// Redirect URL
router.get('/linkedin/redirect', async (req, res) => {
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


//localhost:5001/api/users/id`

app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`))