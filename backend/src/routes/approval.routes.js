const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth.middleware");
const {
  createApproval,
  approveQuotation,
  rejectQuotation,
  getApproval
} = require("../controller/approval.controller");

router.post(
  "/create/:quotationId",
  protect,
  authorize("PROCUREMENT_OFFICER", "ADMIN"),
  createApproval
);

router.put(
  "/approve/:approvalId",
  protect,
  authorize("MANAGER", "ADMIN"),
  approveQuotation
);

router.put(
  "/reject/:approvalId",
  protect,
  authorize("MANAGER", "ADMIN"),
  rejectQuotation
);

router.get(
  "/:id",
  protect,
  authorize("PROCUREMENT_OFFICER", "MANAGER", "ADMIN"),
  getApproval
);

module.exports = router;