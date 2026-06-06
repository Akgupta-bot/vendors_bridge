const PurchaseOrder = require("../models/purchaseOrder.model");
const Quotation = require("../models/qoutation.model");

const createPurchaseOrder = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.quotationId);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    if (quotation.approvalStatus !== "APPROVED") {
      return res.status(400).json({
        success: false,
        message: "Purchase orders can only be generated for approved quotations.",
      });
    }

    const subtotal = quotation.quotedPrice;
    const gstAmount = subtotal * 0.18;
    const totalAmount = subtotal + gstAmount;

    const po = await PurchaseOrder.create({
      poNumber: "PO-" + Date.now(),
      quotation: quotation._id,
      vendor: quotation.vendor,
      rfq: quotation.rfq,
      subtotal,
      gstAmount,
      totalAmount,
      status: "CREATED"
    });

    res.status(201).json({
      success: true,
      po,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPurchaseOrder = async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id)
      .populate({
        path: "vendor",
        populate: { path: "user", select: "firstName lastName email" }
      })
      .populate("quotation")
      .populate("rfq");

    if (!po) {
      return res.status(404).json({
        success: false,
        message: "Purchase Order Not Found",
      });
    }

    res.json({
      success: true,
      po,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate({
        path: "vendor",
        populate: { path: "user", select: "firstName lastName email" }
      })
      .populate("rfq")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrder,
  getAllPurchaseOrders,
};