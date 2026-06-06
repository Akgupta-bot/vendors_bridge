const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const authController = require("../controller/auth.controller");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
)


module.exports = router;