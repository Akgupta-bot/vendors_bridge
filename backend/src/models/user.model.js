const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country location selection is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "PROCUREMENT_OFFICER", "VENDOR"], 
      default: "VENDOR",
    },
    additionalInfo: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String, // Stores base64 data stream or cloud storage asset URL string
      default: "",
      trim: true,
    }
  },
  { timestamps: true }
);

// Explicit optimization indexing for high-speed query execution lookups on login traffic
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);