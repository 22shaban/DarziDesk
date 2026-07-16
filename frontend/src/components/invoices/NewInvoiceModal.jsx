import { useEffect, useState } from "react";
import { getOrders } from "../../api/ordersApi";

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
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadOrders();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    // Order selected
    if (name === "orderId") {
      const selectedOrder = orders.find(
        (order) => order.orderId === value
      );

      if (selectedOrder) {
        const total = Number(selectedOrder.totalAmount || 0);

        setForm({
          orderId: selectedOrder.orderId,
          customerName: selectedOrder.customerName,
          totalAmount: total,
          advancePaid: "",
          remainingAmount: total,
          paymentStatus: "Pending",
        });

        return;
      }
    }

    // Advance changed
    if (name === "advancePaid") {
      const advance = Number(value || 0);
      const total = Number(form.totalAmount || 0);

      const remaining = Math.max(total - advance, 0);

      let paymentStatus = "Pending";

      if (advance === 0) {
        paymentStatus = "Pending";
      } else if (remaining === 0) {
        paymentStatus = "Paid";
      } else {
        paymentStatus = "Partially Paid";
      }

      setForm((previous) => ({
        ...previous,
        advancePaid: advance,
        remainingAmount: remaining,
        paymentStatus,
      }));

      return;
    }

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

                <select
                  className="form-select"
                  name="orderId"
                  value={form.orderId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Order
                  </option>

                  {orders.map((order) => (
                    <option
                      key={order.orderId}
                      value={order.orderId}
                    >
                      {order.orderId} - {order.customerName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Customer Name
                </label>

                <input
                  className="form-control"
                  value={form.customerName}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Total Amount
                </label>

                <input
                  className="form-control"
                  value={form.totalAmount}
                  readOnly
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
                  className="form-control"
                  value={form.remainingAmount}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Payment Status
                </label>

                <input
                  className="form-control"
                  value={form.paymentStatus}
                  readOnly
                />
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