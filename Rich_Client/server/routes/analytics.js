"use strict";
const router = require("express").Router();
const controller = require("../controllers/analytics");
const { auth, isAdmin } = require("../middleware/auth");

// GET analytics data (admin only)
router.get("/analytics", [auth, isAdmin], controller.getAnalytics);

module.exports = router;
