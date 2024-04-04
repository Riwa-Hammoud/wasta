const router = require("express").Router();
const {verifyAndAuthorization, verifyToken, verifyAndAdmin} = require("../middleware/verifyToken");
const bookmarkController = require("../controllers/bookmarkController");


// CREATE BOOKMARKS
router.post("/", bookmarkController.createBookmark);


// DELETE BOOKMARKS
router.delete("/:id", verifyToken, bookmarkController.deleteBookmark);


// GET BOOKMARKS
router.get("/:userId", bookmarkController.getBookmarks);


module.exports = router