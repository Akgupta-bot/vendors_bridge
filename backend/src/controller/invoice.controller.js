const Invoice = require("../models/invoice.model");
const PurchaseOrder = require("../models/purchaseOrder.model");

const createInvoice = async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.poId);

    if (!po) {
      return res.status(404).json({
        success: false,
        message: "Associated Purchase Order not found.",
      });
    }

    const invoiceExists = await Invoice.findOne({ purchaseOrder: po._id });
    if (invoiceExists) {
      return res.status(400).json({
        success: false,
        message: "An invoice ledger node has already been generated for this Purchase Order.",
      });
    }

    const invoice = await Invoice.create({
      invoiceNumber: "INV-" + Date.now(),
      purchaseOrder: po._id,
      vendor: po.vendor,
      subtotal: po.subtotal,
      gstAmount: po.gstAmount,
      totalAmount: po.totalAmount,
      paymentStatus: "UNPAID",
    });

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate({
        path: "vendor",
        populate: { path: "user", select: "firstName lastName email" }
      })
      .populate("purchaseOrder");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice profile instance not found.",
      });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate({
        path: "vendor",
        populate: { path: "user", select: "firstName lastName email" }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
};