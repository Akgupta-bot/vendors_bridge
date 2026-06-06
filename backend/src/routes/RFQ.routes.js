const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware=require("../middleware/role.middleware")
const rfqController = require("../controller/RFQ.controller");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("ProcurementOfficer","Admin"),
  rfqController.createRFQ
);
router.get(
  "/get-all",
  authMiddleware,
  rfqController.getAllRFQs
);
router.get(
  "/get-rfq/:id",
  authMiddleware,
  rfqController.getRFQById
);
router.put("/update/:id",authMiddleware,roleMiddleware("ProcurementOfficer","Admin"),rfqController.updateRFQ);
router.delete("/delete/:id",authMiddleware,roleMiddleware("Admin"),rfqController.deleteRFQ);


module.exports = router;