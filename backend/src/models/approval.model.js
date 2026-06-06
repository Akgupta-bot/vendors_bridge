const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema(
  {
    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      required: true,
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },

    remarks: {
      type: String,
      default: "",
    },

    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Approval",
  approvalSchema
);