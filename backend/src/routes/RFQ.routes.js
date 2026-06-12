const express = require("express");
const router = express.Router();


const { protect, authorize } = require("../middleware/auth.middleware");

// 2. Import the RFQ controller methods safely (Make sure folder path matches 'controller')
const {
  createRFQ,
  getAllRFQs,
  getRFQById,
  updateRFQ,
  deleteRFQ
} = require("../controller/RFQ.controller");


router.post(
  "/create",
  protect,
  authorize("PROCUREMENT_OFFICER", "ADMIN"),
  createRFQ
);


router.get(
  "/get-all",
  protect,
  getAllRFQs
);


router.get(
  "/get-rfq/:id",
  protect,
  getRFQById
);


router.put(
  "/update/:id",
  protect,
  authorize("PROCUREMENT_OFFICER", "ADMIN"),
  updateRFQ
);


router.delete(
  "/delete/:id",
  protect,
  authorize("ADMIN"),
  deleteRFQ
);

module.exports = router;