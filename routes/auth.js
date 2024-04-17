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
router.get("/linkedin/redirect", async (req, res, next) => {
    try {
        const { code } = req.query;
        const tokenResponse = await Redirect(code);
        const accessToken = tokenResponse.access_token;

        // Retrieve user profile using the access token
        const userProfile = await getUserProfile(accessToken);

        // You can handle the user profile data as needed, for example, saving it to the database or returning it as a response
        return res.json(userProfile);
    } catch (error) {
        // Safely access the error message
        const errorMessage = error.message ? error.message : 'An unknown error occurred';
        next(error);
        return res.status(500).json({ error: errorMessage });
    }
});

module.exports = router;
