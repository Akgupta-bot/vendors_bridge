const express=require("express")
const approvalController=require("../controller/approval.controller")
const authMiddleware=require("../middleware/auth.middleware")
const roleMiddleware=require("../middleware/role.middleware")
const router=express.Router()

router.post("/create-approval/:quotationId",authMiddleware,roleMiddleware("ProcurementOfficer"),approvalController.createApproval)
router.put("/approve/:approvalId",authMiddleware,roleMiddleware("ProcurementOfficer"),approvalController.approveQuotation)
router.put("/reject/:approvalId",authMiddleware,roleMiddleware("ProcurementOfficer"),approvalController.rejectQuotation)
router.get("/get-approval/:id",authMiddleware,roleMiddleware("ProcurementOfficer"),approvalController.getApproval)



module.exports=router