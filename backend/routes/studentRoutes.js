const express = require("express");
const { submitForm, getForms, uploadMiddleware } = require("../controllers/studentController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/submit", verifyToken, uploadMiddleware, submitForm);
router.get("/myforms", verifyToken, getForms);

module.exports = router;
