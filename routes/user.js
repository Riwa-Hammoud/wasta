const router = require("express").Router();
const {verifyAndAuthorization, verifyToken, verifyAndAdmin} = require("../middleware/verifyToken");
const userController = require("../controllers/userController")


// Update User 
router.put("/:id", verifyAndAuthorization, userController.updateUser)

// DELETE USER
router.delete("/:id", verifyAndAuthorization, userController.deleteUser)

// GET USER
router.get("/:id", verifyAndAuthorization, userController.getUser)

// GET ALL USERS
router.get("/", verifyAndAdmin, userController.getAllUsers)


module.exports = router