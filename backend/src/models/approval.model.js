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
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

approvalSchema.index({ quotation: 1, status: 1 });
approvalSchema.index({ manager: 1 });

module.exports = mongoose.model("Approval", approvalSchema);