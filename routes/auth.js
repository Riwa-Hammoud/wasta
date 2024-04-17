const router = require("express").Router();
const authController = require("../controllers/authContoller");
const { Authorization, Redirect, getUserProfile } = require('./authHelper');

// REGISTRATION
router.post("/register", authController.createUser);

// LOGIN
router.post("/login", authController.loginUser);

// LinkedIn Authorization
router.get("/linkedin/authorize", (req, res) => {
    return res.redirect(Authorization());
});

// LinkedIn Redirect
router.get("/linkedin/redirect", async (req, res) => {
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

module.exports = router;
