const express = require("express");

const logout = require("../controllers/logout");

const router = express.Router();

router.get("/logout", logout);

module.exports = router;
