require("dotenv").config();
const cors = require("cors");
const express = require("express");

// Route Handlers Import Block
const authRoutes = require("./routes/auth.routes");
const vendorRoutes = require("./routes/vendor.routes");
const rfqRoutes = require("./routes/RFQ.routes");
const quotationRoutes = require("./routes/qoutation.routes");
const approvalRoutes = require("./routes/approval.routes");
const purchaseOrderRoutes = require("./routes/purchaseOrder.routes");
const invoiceRoutes = require("./routes/invoice.routes");

const app = express();

// Global Cross-Origin Settings configuration
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body Parsers (Crucial for handling JSON payloads and base64 attachments)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// API Core Module Route Mapping
app.use("/api/auth", authRoutes);                  
app.use("/api/vendor", vendorRoutes);              
app.use("/api/rfq", rfqRoutes);                    
app.use("/api/quotation", quotationRoutes);        
app.use("/api/approval", approvalRoutes);         
app.use("/api/purchase-order", purchaseOrderRoutes); 
app.use("/api/invoice", invoiceRoutes);         

// Root Diagnostic Health Endpoint Hook
// Global Diagnostic Health Endpoint Hook
app.get("/health", (req, res) => {
    res.status(200).json({ 
        success: true, 
        status: "ONLINE", 
        timestamp: new Date(),
        service: "VendorBridge Core ERP Engine" 
    });
});

// FIXED: Clean catch-all middleware with no path string to bypass path-to-regexp validation errors entirely
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Resource path '${req.originalUrl}' inside this ERP server cluster does not exist.`
    });
});

module.exports = app;