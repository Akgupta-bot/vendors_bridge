const mongoose = require("mongoose");

const rfqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        productName: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        expectedPrice: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    deadline: {
      type: Date,
      required: true,
    },
    vendors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachment: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED", "UNDER_REVIEW","DRAFT", "SENT_TO_VENDORS", "COMPLETED"],
      default: "OPEN",
    },
  },
  { timestamps: true }
);

rfqSchema.index({ status: 1, deadline: 1 });
rfqSchema.index({ createdBy: 1 });

module.exports = mongoose.model("RFQ", rfqSchema);