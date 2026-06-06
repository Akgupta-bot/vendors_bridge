const invoice = require("../models/invoice.model");
const purchaseOrder = require("../models/purchaseOrder.model")
const generateInvoicePDF=require("../utils/generrateInvoicePdf")
const sendEmail=require("../utils/sendEmail")


const createInvoice = async (
  req,
  res
) => {
  try {

    const po =
      await PurchaseOrder.findById(
        req.params.purchaseOrderId
      );

    if (!po) {
      return res.status(404).json({
        success: false,
        message:
          "Purchase Order not found",
      });
    }

    const existingInvoice =
      await Invoice.findOne({
        purchaseOrder: po._id,
      });

    if (existingInvoice) {
      return res.status(400).json({
        success: false,
        message:
          "Invoice already generated",
      });
    }

    const invoice =
      await Invoice.create({
        invoiceNumber:
          "INV-" + Date.now(),

        purchaseOrder: po._id,

        vendor: po.vendor,

        subtotal: po.subtotal,

        gstAmount: po.gstAmount,

        totalAmount:
          po.totalAmount,
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

const getInvoice = async (
  req,
  res
) => {
  try {

    const invoice =
      await Invoice.findById(
        req.params.id
      )
      .populate("vendor")
      .populate("purchaseOrder");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message:
          "Invoice not found",
      });
    }

    res.json({
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

const getAllInvoices =
  async (req, res) => {
    try {

      const invoices =
        await Invoice.find()
          .populate("vendor")
          .populate(
            "purchaseOrder"
          );

      res.json({
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

  const markInvoicePaid =
  async (req, res) => {
    try {

      const invoice =
        await Invoice.findByIdAndUpdate(
          req.params.id,
          {
            status: "Paid",
          },
          {
            new: true,
          }
        );

      res.json({
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

  const downloadInvoicePDF =
async (req, res) => {

  try {

    const invoice =
      await Invoice.findById(
        req.params.id
      );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message:
          "Invoice not found",
      });
    }

    generateInvoicePDF(
      invoice,
      res
    );

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const emailInvoice =
async (req, res) => {

  try {

    const invoice =
      await Invoice.findById(
        req.params.id
      )
      .populate("vendor");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message:
          "Invoice not found",
      });
    }

    await sendEmail(
      invoice.vendor.email,
      "Invoice Generated",
      `
Invoice Number:
${invoice.invoiceNumber}

Total:
₹${invoice.totalAmount}
      `
    );

    invoice.status = "Sent";

    await invoice.save();

    res.json({
      success: true,
      message:
        "Invoice Email Sent",
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
  getInvoice,
  getAllInvoices,
  markInvoicePaid,
  downloadInvoicePDF,
  emailInvoice,

};