const mongoose = require("mongoose");

const rfqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

 items: [
  {
    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    expectedPrice: {
      type: Number,
      default: 0,
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
    },

    attachment: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RFQ", rfqSchema);