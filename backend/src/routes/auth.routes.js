const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const { register, login } = require("../controller/auth.controller");


router.post("/register", register);

router.post("/login", login);


router.get("/notifications", protect, (req, res) => {
  res.json({ message: "Notifications loaded." });
});




router.post("/rfq/create", protect, authorize("PROCUREMENT_OFFICER", "ADMIN"), (req, res) => {
  res.json({ message: "RFQ structured workflow initiated." });
});


router.post("/quotations/approve", protect, authorize("MANAGER"), (req, res) => {
  res.json({ message: "Quotation pipeline approved." });
});

module.exports = router;