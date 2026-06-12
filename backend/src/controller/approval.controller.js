const Approval = require("../models/approval.model");
const Quotation = require("../models/qoutation.model");

const createApproval = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.quotationId);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    const approval = await Approval.create({
      quotation: req.params.quotationId,
      manager: req.user.id,
      status: "PENDING"
    });

    res.status(201).json({
      success: true,
      approval,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveQuotation = async (req, res) => {
  try {
    const approval = await Approval.findByIdAndUpdate(
      req.params.approvalId,
      {
        status: "APPROVED",
        remarks: req.body.remarks,
        manager: req.user.id,
        approvedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!approval) {
      return res.status(404).json({
        success: false,
        message: "Approval tracking record not found.",
      });
    }

    await Quotation.findByIdAndUpdate(
      approval.quotation,
      { approvalStatus: "APPROVED" },
      { runValidators: true }
    );

    res.json({
      success: true,
      approval,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectQuotation = async (req, res) => {
  try {
    const approval = await Approval.findByIdAndUpdate(
      req.params.approvalId,
      {
        status: "REJECTED",
        remarks: req.body.remarks,
        manager: req.user.id,
        approvedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!approval) {
      return res.status(404).json({
        success: false,
        message: "Approval tracking record not found.",
      });
    }

    await Quotation.findByIdAndUpdate(
      approval.quotation,
      { approvalStatus: "REJECTED" },
      { runValidators: true }
    );

    res.json({
      success: true,
      approval,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApproval = async (req, res) => {
  try {
    const approval = await Approval.findById(req.params.id)
      .populate({
        path: "quotation",
        populate: { path: "rfq" }
      })
      .populate("manager", "firstName lastName email role");

    if (!approval) {
      return res.status(404).json({
        success: false,
        message: "Approval not found",
      });
    }

    res.json({
      success: true,
      approval,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createApproval,
  approveQuotation,
  rejectQuotation,
  getApproval,
};