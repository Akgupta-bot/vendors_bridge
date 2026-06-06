const express = require("express");
const router = express.Router();


const { protect, authorize } = require("../middleware/auth.middleware");

const {
  registerVendor,
  getAllVendors,
  getVendorById,
  updateVendorStatus,
  deleteVendor
} = require("../controller/vendor.controller");




router.post(
  "/", 
  protect, 
  authorize("PROCUREMENT_OFFICER", "ADMIN", "VENDOR"), 
  registerVendor
);


router.get(
  "/get-all-vender", 
  protect, 
  authorize("PROCUREMENT_OFFICER", "MANAGER", "ADMIN",'VENDOR'), 
  getAllVendors
);

// Route 3: Fetch a targeted vendor profile by its individual object record identity reference
router.get(
  "/get-vender/:id", 
  protect, 
  authorize("PROCUREMENT_OFFICER", "MANAGER", "ADMIN"), 
  getVendorById
);

// Route 4: Transform compliance states or verification indicators (e.g., ACTIVE, INACTIVE) 
// Isolated to Admins who enforce administrative data verification guidelines.
router.patch(
  "/update/:id", 
  protect, 
  authorize("ADMIN"), 
  updateVendorStatus
);

// Route 5: Strip/Erase a vendor document tracking index line link out of the collection
router.delete(
  "/delete/:id", 
  protect, 
  authorize("ADMIN"), 
  deleteVendor
);

module.exports = router;