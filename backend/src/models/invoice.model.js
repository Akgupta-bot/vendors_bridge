const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    gstAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PAID", "PARTIAL", "OVERDUE"],
      default: "UNPAID",
    },

    pdfUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


invoiceSchema.index({ vendor: 1, paymentStatus: 1 });

module.exports = mongoose.model("Invoice", invoiceSchema);