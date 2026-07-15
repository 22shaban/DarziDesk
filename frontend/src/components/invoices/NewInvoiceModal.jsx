import { useState } from "react";

const initialForm = {
  orderId: "",
  customerName: "",
  totalAmount: "",
  advancePaid: "",
  remainingAmount: "",
  paymentStatus: "Pending",
};

function NewInvoiceModal({ onClose, onSave }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSave({
      ...form,
      totalAmount: Number(form.totalAmount),
      advancePaid: Number(form.advancePaid),
      remainingAmount: Number(form.remainingAmount),
    });

    setForm(initialForm);
  }

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Add Invoice
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">
                  Order ID
                </label>

                <input
                  className="form-control"
                  name="orderId"
                  value={form.orderId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Customer Name
                </label>

                <input
                  className="form-control"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Total Amount
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="totalAmount"
                  value={form.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Advance Paid
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="advancePaid"
                  value={form.advancePaid}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Remaining Amount
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="remainingAmount"
                  value={form.remainingAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Payment Status
                </label>

                <select
                  className="form-select"
                  name="paymentStatus"
                  value={form.paymentStatus}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>Partially Paid</option>
                  <option>Paid</option>
                </select>
              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Invoice
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default NewInvoiceModal;