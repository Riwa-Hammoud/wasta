const router = require("express").Router();
const { Authorization, Redirect, getUserProfile } = require('../helpers/authHelper');


// REGISTRATION 

router.post("/register", authController.createUser)



// LOGIN 
router.post("/login", authController.loginUser)

// router.post("/login", authController.loginUser);


module.exports = router;