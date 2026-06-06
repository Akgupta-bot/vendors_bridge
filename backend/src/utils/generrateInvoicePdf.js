const PDFDocument = require("pdfkit");

const generateInvoicePDF = (
  invoice,
  res
) => {

  const doc = new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${invoice.invoiceNumber}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(24)
     .text("VendorBridge Invoice", {
       align: "center",
     });

  doc.moveDown();

  doc.fontSize(14)
     .text(
       `Invoice Number: ${invoice.invoiceNumber}`
     );

  doc.text(
    `Invoice Status: ${invoice.status}`
  );

  doc.moveDown();

  doc.text(
    `Subtotal: ₹${invoice.subtotal}`
  );

  doc.text(
    `GST: ₹${invoice.gstAmount}`
  );

  doc.text(
    `Total: ₹${invoice.totalAmount}`
  );

  doc.moveDown();

  doc.text(
    `Generated At: ${new Date().toLocaleDateString()}`
  );

  doc.end();
};

module.exports =
  generateInvoicePDF;