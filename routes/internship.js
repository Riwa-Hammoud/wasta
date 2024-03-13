const router = require("express").Router();
const {verifyAndAuthorization, verifyToken, verifyAndAdmin} = require("../middleware/verifyToken");
const InternshipController = require("../controllers/InternshipController")


// POST INTERNSHIP
router.post("/", verifyAndAdmin, InternshipController.createInternship)

// Update INTERNSHIP 
router.put("/:id", verifyAndAdmin, InternshipController.updateInternship)

// DELETE INTERNSHIP
router.delete("/:id", verifyAndAdmin, InternshipController.deleteInternship)

// GET INTERNSHIP
router.get("/:id", InternshipController.getInternship)

// GET ALL INTERNSHIPS
router.get("/", InternshipController.getAllInternships)

// SEARCH INTERNSHIP
router.get("/search/:key", InternshipController.searchInternships)


module.exports = router