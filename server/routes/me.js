const express = require("express");
const me = require("../controllers/me");
const verifyToken = require("../auth/verifyToken");
const router = express.Router();

router.get("/me", verifyToken, me);

module.exports = router;
