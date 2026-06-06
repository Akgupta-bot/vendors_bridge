const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth.middleware");
const qoutationController = require("../controller/qoutation.controller");

router.post(
  "/submit-quotation",
  protect,
  authorize("VENDOR"),
  qoutationController.submitQuotation
);  

router.get(
  "/get-rfq-quotations/:rfqId",
  protect,
  authorize("PROCUREMENT_OFFICER", "MANAGER", "ADMIN"),
  qoutationController.getRFQQuotations
);

router.get(
  "/get-quotation/:id",
  protect,
  qoutationController.getQuotationById
);

router.put(
  "/update/:id",
  protect,
  authorize("VENDOR"),
  qoutationController.updateQuotation
);

router.get(
  "/compare-quotations/:rfqId",
  protect,
  authorize("PROCUREMENT_OFFICER", "MANAGER", "ADMIN"),
  qoutationController.compareQuotations
);

router.put(
  "/select-quotation/:rfqId/:quotationId",
  protect,
  authorize("PROCUREMENT_OFFICER", "ADMIN"),
  qoutationController.selectQuotation
);

module.exports = router;