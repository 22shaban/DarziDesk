import { jsPDF } from "jspdf";

export function generateInvoicePDF(invoice) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41);
  doc.text("DarziDesk", 20, 20);

  doc.setFontSize(11);
  doc.setTextColor(120);
  doc.text("Tailor Shop Management System", 20, 28);

  // Divider
  doc.setDrawColor(180);
  doc.line(20, 34, 190, 34);

  // Invoice Title
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("Invoice", 20, 48);

  doc.setFontSize(11);

  let y = 62;

  const rows = [
    ["Invoice ID", invoice.invoiceId || "-"],
    ["Order ID", invoice.orderId || "-"],
    ["Customer", invoice.customerName || "-"],
    ["Total Amount", `₹${invoice.totalAmount || 0}`],
    ["Advance Paid", `₹${invoice.advancePaid || 0}`],
    ["Remaining Amount", `₹${invoice.remainingAmount || 0}`],
    ["Payment Status", invoice.paymentStatus || "-"],
    [
      "Generated On",
      new Date().toLocaleDateString(),
    ],
  ];

  rows.forEach(([label, value]) => {
    doc.setFont(undefined, "bold");
    doc.text(label, 20, y);

    doc.setFont(undefined, "normal");
    doc.text(String(value), 80, y);

    y += 12;
  });

  // Footer Line
  doc.line(20, y + 8, 190, y + 8);

  doc.setFontSize(12);
  doc.setTextColor(80);

  doc.text(
    "Thank you for choosing DarziDesk!",
    20,
    y + 22
  );

  doc.setFontSize(10);

  doc.text(
    "Powered by AWS",
    20,
    y + 32
  );

  doc.save(
    `Invoice_${invoice.invoiceId || "invoice"}.pdf`
  );
}