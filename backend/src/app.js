require("dotenv").config()
const cors = require("cors");
const express=require("express")
const authRoutes = require("./routes/auth.routes");
const vendorRoutes = require("./routes/vendor.routes");
const rfqRoutes = require("./routes/RFQ.routes");

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
module.exports=app