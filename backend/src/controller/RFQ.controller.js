const RFQ = require("../models/RFQ.model");


// Create RFQ

const createRFQ = async (req, res) => {
  try {
    const rfq = await RFQ.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
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


// Get All RFQs

const getAllRFQs = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    const rfqs = await RFQ.find(query)
      .populate("vendors")
      .populate("createdBy", "name role");

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


// Get Single RFQ

const getRFQById = async (req, res) => {
  try {
    const rfq = await RFQ.findById(req.params.id)
      .populate("vendors")
      .populate("createdBy");

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


// Update RFQ

const updateRFQ = async (req, res) => {
  try {
    const rfq = await RFQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

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


// Delete RFQ

const deleteRFQ = async (req, res) => {
  try {
    await RFQ.findByIdAndDelete(req.params.id);

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