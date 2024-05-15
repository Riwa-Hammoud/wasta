const router = require("express").Router();
const {verifyAndAuthorization, verifyToken, verifyAndAdmin, verifyAndAgent} = require("../middleware/verifyToken");
const InternshipController = require("../controllers/InternshipController")


// POST INTERNSHIP
router.post("/", verifyAndAgent, InternshipController.createInternship)

// Update INTERNSHIP 
router.put("/:id", verifyAndAgent, InternshipController.updateInternship)

// DELETE INTERNSHIP
router.delete("/:id", verifyAndAgent, InternshipController.deleteInternship)

// GET INTERNSHIP
router.get("/:id", InternshipController.getInternship)

// GET ALL INTERNSHIPS
router.get("/", InternshipController.getAllInternships)

// SEARCH INTERNSHIP
router.get("/search/:key", InternshipController.searchInternships)


module.exports = router