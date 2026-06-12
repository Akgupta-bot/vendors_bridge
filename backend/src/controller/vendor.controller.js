const Vendor = require("../models/vendor.model");


const registerVendor = async (req, res) => {
  try {
    
    const vendorData = {
      ...req.body,
      user: req.user.id, 
    };

    // If string categories were passed down, normalize them to match our uppercase schema design
    if (vendorData.category) vendorData.category = vendorData.category.toUpperCase();

    const vendor = await Vendor.create(vendorData);

    res.status(201).json({
      success: true,
      message: "Vendor data profile successfully provisioned inside the ERP cluster.",
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllVendors = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let query = {};

    // Handles fuzzy substring matches across corporate company names [cite: 50]
    if (search) {
      query.companyName = {
        $regex: search,
        $options: "i",
      };
    }

    // Normalizes filter strings to upper-case to avoid document validation drops [cite: 50]
    if (category) {
      query.category = category.toUpperCase();
    }

    if (status) {
      query.status = status.toUpperCase();
    }

    // Automatically populates user account structural fields (like email/name) from the reference
    const vendors = await Vendor.find(query)
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("user", "firstName lastName email");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Requested Vendor profile reference node not found.",
      });
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVendorStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status parameter value is required to execute a pipeline modification update.",
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status: status.toUpperCase() }, // Forces clean uppercase system state transitions
      { new: true, runValidators: true }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor node profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Vendor pipeline state successfully transformed to ${status.toUpperCase()}.`,
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor file link could not be deleted because it does not exist.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor operational document reference deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerVendor,      // Name aligned with vendor.routes.js perfectly!
  getAllVendors,
  getVendorById,
  updateVendorStatus,  // Name aligned with vendor.routes.js perfectly!
  deleteVendor,
};