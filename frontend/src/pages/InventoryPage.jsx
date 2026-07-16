import { useEffect, useState } from "react";
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../services/invoiceApi";

import InvoiceTable from "../components/invoices/InvoiceTable";
import NewInvoiceModal from "../components/invoices/NewInvoiceModal";
import EditInvoiceModal from "../components/invoices/EditInvoiceModal";

import "./InvoicesPage.css";

function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  async function loadInvoices() {
    try {
      const data = await getInvoices();
      setInvoices(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  async function handleCreate(data) {
    try {
      await createInvoice(data);
      setShowNewModal(false);
      loadInvoices();
    } catch {
      alert("Failed to create invoice.");
    }
  }

  async function handleUpdate(data) {
    try {
      await updateInvoice(data.invoiceId, data);
      setEditingInvoice(null);
      loadInvoices();
    } catch {
      alert("Failed to update invoice.");
    }
  }

  async function handleDelete(invoice) {
    if (
      !window.confirm(
        `Delete invoice for ${invoice.customerName}?`
      )
    ) {
      return;
    }

    try {
      await deleteInvoice(invoice.invoiceId);
      loadInvoices();
    } catch {
      alert("Failed to delete invoice.");
    }
  }

  return (
    <div className="invoices-page">

      <div className="page-header">

        <div>
          <h2>Invoices</h2>

          <p>
            Manage customer invoices and payments.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowNewModal(true)}
        >
          + Add Invoice
        </button>

      </div>

      <InvoiceTable
        invoices={invoices}
        onEdit={setEditingInvoice}
        onDelete={handleDelete}
      />

      {showNewModal && (
        <NewInvoiceModal
          onClose={() => setShowNewModal(false)}
          onSave={handleCreate}
        />
      )}

      {editingInvoice && (
        <EditInvoiceModal
          invoice={editingInvoice}
          onClose={() => setEditingInvoice(null)}
          onSave={handleUpdate}
        />
      )}

    </div>
  );
}

export default InvoicesPage;