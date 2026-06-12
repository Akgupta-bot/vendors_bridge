const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth.middleware");
const {
  createPurchaseOrder,
  getPurchaseOrder,
  getAllPurchaseOrders
} = require("../controller/purchaseOrder.controller");

router.post(
  "/create/:quotationId",
  protect,
  authorize("PROCUREMENT_OFFICER", "ADMIN"),
  createPurchaseOrder
);

router.get(
  "/get-order/:id",
  protect,
  authorize("PROCUREMENT_OFFICER", "MANAGER", "VENDOR", "ADMIN"),
  getPurchaseOrder
);

router.get(
  "/get-all",
  protect,
  authorize("PROCUREMENT_OFFICER", "MANAGER", "ADMIN"),
  getAllPurchaseOrders
);

module.exports = router;