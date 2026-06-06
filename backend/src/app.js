require("dotenv").config()
const cors = require("cors");
const express=require("express")
const authRoutes = require("./routes/auth.routes");
const vendorRoutes = require("./routes/vendor.routes");
const rfqRoutes = require("./routes/RFQ.routes");
const quotationRoutes=require("./routes/qoutation.routes")
const approvalRoutes=require("./routes/approval.routes")
const purchaseOrderRoutes=require("./routes/purchaseOrder.routes")
const invoiceRoutes=require("./routes/invoice.routes")

const app=express()
app.use(cors(
    {
        origin:"*"
    }
))
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/rfq", rfqRoutes)
app.use("/api/quotation",quotationRoutes);
app.use("/api/approval",approvalRoutes)
app.use("/api/purchase-order",purchaseOrderRoutes)
app.use("/api/invoice",invoiceRoutes)

module.exports=app