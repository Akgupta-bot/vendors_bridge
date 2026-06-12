const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    rfq: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RFQ",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    quotedPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryDays: {
      type: Number,
      required: true,
      min: 1,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["SUBMITTED", "SELECTED", "REJECTED"],
      default: "SUBMITTED",
    },

    approvalStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

quotationSchema.index({ rfq: 1, quotedPrice: 1 });
quotationSchema.index({ vendor: 1 });

module.exports = mongoose.model("Quotation", quotationSchema);