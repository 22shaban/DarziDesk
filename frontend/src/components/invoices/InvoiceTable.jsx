import EmptyState from "../orders/EmptyState";
import { generateInvoicePDF } from "../../utils/pdfGenerator";
import { useShop } from "../../context/ShopContext";
import "./InvoiceTable.css";
import { sendInvoiceEmail } from "../../services/emailApi";
import { getCustomers } from "../../services/customersApi";

const columns = [
  "Order ID",
  "Customer",
  "Total",
  "Advance",
  "Remaining",
  "Payment",
  "Actions",
];

function InvoiceTable({
  invoices = [],
  onEdit,
  onDelete,
}) {
  const { shop } = useShop();
 async function handleEmail(invoice) {
  try {
    const customers = await getCustomers();

const customer = customers.find(
  (c) => c.customerName === invoice.customerName
);
    if (!customer) {
      alert("Customer not found.");
      return;
    }

    if (!customer.email) {
      alert("Customer has no email address.");
      return;
    }

    await sendInvoiceEmail(
      {
        ...invoice,
        customerEmail: customer.email,
      },
      shop
    );

    alert("Invoice email sent successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to send invoice email.");
  }
}

  return (
    <div className="invoice-table-card">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan="7">
                <EmptyState
                  title="No invoices found."
                  message='Click "Add Invoice" to create your first invoice.'
                />
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td>{invoice.orderId}</td>

                <td>{invoice.customerName}</td>

                <td>₹{invoice.totalAmount}</td>

                <td>₹{invoice.advancePaid}</td>

                <td>₹{invoice.remainingAmount}</td>

                <td>{invoice.paymentStatus}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(invoice)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger me-2"
                    onClick={() => onDelete(invoice)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() =>
                      generateInvoicePDF(invoice, shop)
                    }
                  >
                    PDF
                  </button>
                  <button
  className="btn btn-sm btn-outline-warning ms-2"
  onClick={() => handleEmail(invoice)}
>
  Email
</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;