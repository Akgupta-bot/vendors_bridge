const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")
const roleMiddleware=require("../middleware/role.middleware")
const venderController=require("../controller/vendor.controller")
const router=express.Router()

router.post("/",authMiddleware,roleMiddleware("Admin"),venderController.createVendor)
router.get("/get-all-vender",authMiddleware,roleMiddleware("Admin"),venderController.getAllVendors)
router.get("/get-vender/:id",authMiddleware,roleMiddleware("Admin"),venderController.getVendorById)
router.put("/update",authMiddleware,roleMiddleware("Admin"),venderController.updateVendor)
router.delete("/delete",authMiddleware,roleMiddleware("Admin"),venderController.deleteVendor)
module.exports=router