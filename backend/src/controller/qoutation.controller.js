const qoutationModel=require("../models/qoutation.model")
const venderModel=require("../models/vendor.model")

const submitQuotation = async (req, res) => {
  try {
    const Vendor = require("../models/Vendor");

const vendor = await Vendor.findOne({
  user: req.user.id,
});

if (!vendor) {
  return res.status(404).json({
    success: false,
    message: "Vendor Profile Not Found",
  });
}

const quotation = await Quotation.create({
  rfq: req.body.rfq,
  vendor: vendor._id,
  quotedPrice: req.body.quotedPrice,
  deliveryDays: req.body.deliveryDays,
  notes: req.body.notes,
});

    res.status(201).json({
      success: true,
      quotation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRFQQuotations = async (
  req,
  res
) => {
  try {
    const quotations =
      await Quotation.find({
        rfq: req.params.rfqId,
      })
        .populate("vendor")
        .populate("rfq");

    res.json({
      success: true,
      count: quotations.length,
      quotations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getQuotationById = async (
  req,
  res
) => {
  try {
    const quotation =
      await Quotation.findById(
        req.params.id
      )
        .populate("vendor")
        .populate("rfq");

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation Not Found",
      });
    }

    res.json({
      success: true,
      quotation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateQuotation = async (
  req,
  res
) => {
  try {
    const quotation =
      await Quotation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      quotation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const compareQuotations = async (
  req,
  res
) => {
  try {

    const quotations =
      await Quotation.find({
        rfq: req.params.rfqId,
      })
      .populate(
        "vendor",
        "companyName category"
      )
      .sort({
        quotedPrice: 1,
      });

    if (!quotations.length) {
      return res.status(404).json({
        success: false,
        message:
          "No quotations found",
      });
    }

    const lowestPrice =
      quotations[0].quotedPrice;

    const comparison =
      quotations.map((quote) => ({
        quotationId: quote._id,

        vendor:
          quote.vendor.companyName,

        category:
          quote.vendor.category,

        quotedPrice:
          quote.quotedPrice,

        deliveryDays:
          quote.deliveryDays,

        notes: quote.notes,

        isLowestPrice:
          quote.quotedPrice ===
          lowestPrice,
      }));

    res.json({
      success: true,
      rfqId: req.params.rfqId,
      comparison,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const selectQuotation = async (
  req,
  res
) => {
  try {

    await Quotation.updateMany(
      {
        rfq: req.params.rfqId,
      },
      {
        status: "Rejected",
      }
    );

    const selected =
      await Quotation.findByIdAndUpdate(
        req.params.quotationId,
        {
          status: "Selected",
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      selected,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  submitQuotation,
  getRFQQuotations,
  getQuotationById,
  updateQuotation,
  compareQuotations,
  selectQuotation,


};