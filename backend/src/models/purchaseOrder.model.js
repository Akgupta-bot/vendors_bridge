const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
  {
    poNumber: {
      type: String,
      unique: true,
    },

    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      unique:true,
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
    },

    gstAmount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Created",
        "Sent",
        "Completed"
      ],
      default: "Created",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema
);