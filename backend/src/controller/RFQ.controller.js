const RFQ = require("../models/RFQ.model");


const createRFQ = async (req, res) => {
  try {
    const rfqData = {
      ...req.body,
      createdBy: req.user.id, // Injected securely from auth protection middleware token
    };

    // Normalize status string if it's passed in the body payload
    if (rfqData.status) {
      rfqData.status = rfqData.status.toUpperCase();
    }

    const rfq = await RFQ.create(rfqData);

    res.status(201).json({
      success: true,
      message: "RFQ structured workflow initiated successfully.",
      rfq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllRFQs = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    // Fix: Force status matching parameters to uppercase to prevent document casing drops
    if (status) {
      query.status = status.toUpperCase();
    }

    // Handles fuzzy substring searches across RFQ titles [cite: 55]
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Fix: Populates separate firstName and lastName properties instead of old deprecated single "name" string
    const rfqs = await RFQ.find(query)
      .populate({
        path: "vendors",
        populate: { path: "user", select: "firstName lastName email" }
      })
      .populate("createdBy", "firstName lastName role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: rfqs.length,
      rfqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRFQById = async (req, res) => {
  try {
    const rfq = await RFQ.findById(req.params.id)
      .populate({
        path: "vendors",
        populate: { path: "user", select: "firstName lastName email phone" }
      })
      .populate("createdBy", "firstName lastName email role");

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ Not Found",
      });
    }

    res.json({
      success: true,
      rfq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateRFQ = async (req, res) => {
  try {
    if (req.body.status) {
      req.body.status = req.body.status.toUpperCase();
    }

    const rfq = await RFQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ Not Found",
      });
    }

    res.json({
      success: true,
      message: "RFQ details modified successfully.",
      rfq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteRFQ = async (req, res) => {
  try {
    const rfq = await RFQ.findByIdAndDelete(req.params.id);

    if (!rfq) {
      return res.status(404).json({
        success: false,
        message: "RFQ record could not be deleted because it does not exist.",
      });
    }

    res.json({
      success: true,
      message: "RFQ Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRFQ,
  getAllRFQs,
  getRFQById,
  updateRFQ,
  deleteRFQ,
};