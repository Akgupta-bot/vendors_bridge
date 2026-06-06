const Approval = require("../models/approval.model");
const Quotation = require("../models/quotation.model");

const createApproval = async (
  req,
  res
) => {
  try {

    const quotation =
      await Quotation.findById(
        req.params.quotationId
      );

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    const approval =
      await Approval.create({
        quotation:
          req.params.quotationId,
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


const approveQuotation = async (
  req,
  res
) => {
  try {

    const approval =
      await Approval.findByIdAndUpdate(
        req.params.approvalId,
        {
          status: "Approved",

          remarks:
            req.body.remarks,

          manager:
            req.user.id,

          approvedAt:
            new Date(),
        },
        {
          new: true,
        }
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


const rejectQuotation = async (
  req,
  res
) => {
  try {

    const approval =
      await Approval.findByIdAndUpdate(
        req.params.approvalId,
        {
          status: "Rejected",

          remarks:
            req.body.remarks,

          manager:
            req.user.id,

          approvedAt:
            new Date(),
        },
        {
          new: true,
        }
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


const getApproval = async (
  req,
  res
) => {
  try {

    const approval =
      await Approval.findById(
        req.params.id
      )
      .populate("quotation")
      .populate(
        "manager",
        "name email"
      );

    if (!approval) {
      return res.status(404).json({
        success: false,
        message:
          "Approval not found",
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