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
    },

    deliveryDays: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Selected",
        "Rejected"
      ],
      default: "Submitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Quotation",
  quotationSchema
);