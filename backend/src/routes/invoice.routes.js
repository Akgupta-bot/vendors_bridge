const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth.middleware");
const {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
} = require("../controller/invoice.controller");

router.post(
  "/create/:poId",
  protect,
  authorize("VENDOR", "ADMIN"),
  createInvoice
);

router.get(
  "/get-invoice/:id",
  protect,
  authorize("PROCUREMENT_OFFICER", "MANAGER", "VENDOR", "ADMIN"),
  getInvoiceById
);

router.get(
  "/get-all",
  protect,
  authorize("PROCUREMENT_OFFICER", "MANAGER", "ADMIN"),
  getAllInvoices
);

module.exports = router;