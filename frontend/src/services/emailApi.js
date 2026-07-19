import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export async function sendInvoiceEmail(invoice, shop) {
  const response = await axios.post(
    `${API_BASE_URL}/email/send-invoice`,
    {
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      invoiceId: invoice.invoiceId,
      totalAmount: invoice.totalAmount,
      paymentStatus: invoice.paymentStatus,
      shopName: shop.shopName,
    }
  );

  return response.data;
}