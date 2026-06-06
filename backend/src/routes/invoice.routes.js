const express= require("express")
const authMiddleware=require("../middleware/auth.middleware")
const roleMiddleware=require("../middleware/role.middleware")
const invoiceController=require("../controller/invoice.controller")
const router=express.Router()

router.post("/create-invoice/:purchaseOrderId",authMiddleware,roleMiddleware("ProcurementOfficer","Admin"),invoiceController.createInvoice)
router.get("/get-invoice/:id",authMiddleware,invoiceController.getInvoice)
router.get("/get-all-invoices",authMiddleware,invoiceController.getAllInvoices)
router.put("/paid/:id",authMiddleware,invoiceController.markInvoicePaid)

module.exports=router