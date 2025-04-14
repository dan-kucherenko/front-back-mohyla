const router = require("express").Router();
const controller = require("../controllers/auth");
const { auth, isAdmin } = require("../middleware/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/verify/:token", controller.verifyEmail);
router.get("/verify", auth, controller.verifyToken);
router.post("/create-admin", [auth, isAdmin], controller.createAdmin);

module.exports = router;
