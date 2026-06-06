const express = require("express");
const qoutationController=require("../controller/qoutation.controller")
const authMiddleware=require("../middleware/auth.middleware")
const roleMiddleware=require("../middleware/role.middleware")
const router= express.Router()
router.post("/submit-quotation",authMiddleware,roleMiddleware("Vendor"),qoutationController.submitQuotation)
router.get("/get-rfq-quotations/:rfqId",authMiddleware,qoutationController.getRFQQuotations)
router.get("/get-quotation/:id",authMiddleware,qoutationController.getQuotationById)
router.put("/update/:id",authMiddleware,roleMiddleware("Vendor"),qoutationController.updateQuotation)
router.get("/compare-quotations/:rfqId",authMiddleware,roleMiddleware("Vendor","ProcurementOfficer"),qoutationController.compareQuotations)
router.put("/select-quotation/:rfqId/:quotationId",authMiddleware,roleMiddleware("ProcurementOfficer","Admin"),qoutationController.selectQuotation)
module.exports=router