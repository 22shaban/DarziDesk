import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

const PAGE_SIZE = 5;

function InvoicesPage() {
  const location = useLocation();

  const [invoices, setInvoices] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  async function loadInvoices() {
    try {
      const data = await getInvoices();
      setInvoices(data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  }

  // Load invoices on page load
  useEffect(() => {
    loadInvoices();
  }, []);

  // Open Add Invoice modal when coming from Orders page
  useEffect(() => {
    if (location.state?.selectedOrder) {
      setSelectedOrder(location.state.selectedOrder);
      setShowNewModal(true);
    }
  }, [location.state]);

  async function handleCreate(data) {
    try {
      await createInvoice(data);

      setShowNewModal(false);
      setSelectedOrder(null);

      loadInvoices();
    } catch (error) {
      console.error(error);
      alert("Failed to create invoice.");
    }
  }

  async function handleUpdate(data) {
    try {
      await updateInvoice(data.invoiceId, data);

      setEditingInvoice(null);

      loadInvoices();
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
      alert("Failed to delete invoice.");
    }
  }
const totalPages =
  Math.ceil(invoices.length / PAGE_SIZE) || 1;

const paginatedInvoices = invoices.slice(
  (currentPage - 1) * PAGE_SIZE,
  currentPage * PAGE_SIZE
);
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
          onClick={() => {
            setSelectedOrder(null);
            setShowNewModal(true);
          }}
        >
          + Add Invoice
        </button>

      </div>

     <InvoiceTable
  invoices={paginatedInvoices}
        onEdit={setEditingInvoice}
        onDelete={handleDelete}
      />
<div className="orders-pagination-placeholder mt-4 d-flex justify-content-center align-items-center gap-3">

  <button
    className="btn btn-outline-secondary"
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage((page) => page - 1)
    }
  >
    Previous
  </button>

  <span>
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-outline-secondary"
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage((page) => page + 1)
    }
  >
    Next
  </button>

</div>
      {showNewModal && (
        <NewInvoiceModal
          selectedOrder={selectedOrder}
          onClose={() => {
            setShowNewModal(false);
            setSelectedOrder(null);
          }}
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