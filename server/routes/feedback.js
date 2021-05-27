const express = require("express");
const verifyToken = require("../auth/verifyToken");
const { getFeedbacks, saveFeedback } = require("../controllers/feedback");

const router = express.Router();

router.post("/feedback", verifyToken, saveFeedback);
router.get("/feedbacks", verifyToken, getFeedbacks);

module.exports = router;
