const router = require("express").Router();
const controller = require("../controllers/auth");
const { auth } = require("../middleware/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/verify/:token", controller.verifyEmail);
router.get("/verify", auth, controller.verifyToken);

module.exports = router;
