const express = require("express");
const authMiddleware=require("../middleware/auth.middleware")
const roleMiddleware=require("../middleware/role.middleware")
const purchaseOrderController=require("../controller/purchaseOrder.controller")

const router = express.Router();

router.post("/create-purchase-order/:quotationId",authMiddleware,roleMiddleware("ProcurementOfficer","Admin"),purchaseOrderController.createPurchaseOrder)
router.get("/get-purchase-order/:id",authMiddleware,purchaseOrderController.getPurchaseOrder)
router.get("/get-all-purchase-orders",authMiddleware,purchaseOrderController.getAllPurchaseOrders)
    

module.exports=router