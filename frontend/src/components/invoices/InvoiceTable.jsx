import EmptyState from "../orders/EmptyState";
import "./InvoiceTable.css";

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
  invoices,
  onEdit,
  onDelete,
}) {
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
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(invoice)}
                  >
                    Delete
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