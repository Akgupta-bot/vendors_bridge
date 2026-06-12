const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      unique: true,
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    rfq: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RFQ",
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

    status: {
      type: String,
      enum: ["CREATED", "SENT", "COMPLETED"],
      default: "CREATED",
    },
  },
  {
    timestamps: true,
  }
);


purchaseOrderSchema.index({ vendor: 1, status: 1 });

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);