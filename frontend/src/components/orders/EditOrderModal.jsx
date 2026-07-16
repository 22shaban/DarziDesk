import { useState } from "react";
import { updateOrder } from "../../services/ordersApi";
import "./NewOrderModal.css";

function EditOrderModal({ order, onClose, onUpdated }) {
  const [customerName, setCustomerName] = useState(order.customerName);
  const [phone, setPhone] = useState(order.phone);
  const [garmentType, setGarmentType] = useState(order.garmentType);
  const [deliveryDate, setDeliveryDate] = useState(order.deliveryDate || "");
  const [assignedTailor, setAssignedTailor] = useState(
    order.assignedTailor || ""
  );

  const [totalAmount, setTotalAmount] = useState(
    Number(order.totalAmount || 0)
  );

  const [advance, setAdvance] = useState(
    Number(order.advance || 0)
  );

  const [status, setStatus] = useState(order.status);

  const remaining = Math.max(totalAmount - advance, 0);

  async function handleUpdate() {
    try {
      await updateOrder(order.orderId, {
        customerName,
        phone,
        garmentType,
        deliveryDate,
        assignedTailor,
        totalAmount,
        advance,
        remaining,
        status,
      });

    await onUpdated()

alert('Order updated successfully!')

onClose()
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Edit Order</h2>

        <div className="mb-3">
          <label className="form-label">
            Customer Name
          </label>

          <input
            className="form-control"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Phone
          </label>

          <input
            className="form-control"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Garment Type
          </label>

          <input
            className="form-control"
            value={garmentType}
            onChange={(e) =>
              setGarmentType(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Delivery Date
          </label>

          <input
            type="date"
            className="form-control"
            value={deliveryDate}
            onChange={(e) =>
              setDeliveryDate(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Assigned Tailor
          </label>

          <input
            className="form-control"
            value={assignedTailor}
            onChange={(e) =>
              setAssignedTailor(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Total Amount
          </label>

          <input
            type="number"
            className="form-control"
            value={totalAmount}
            onChange={(e) =>
              setTotalAmount(Number(e.target.value))
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Advance Paid
          </label>

          <input
            type="number"
            className="form-control"
            value={advance}
            onChange={(e) =>
              setAdvance(
                Math.min(
                  Number(e.target.value),
                  totalAmount
                )
              )
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Remaining Amount
          </label>

          <input
            className="form-control"
            value={remaining}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="form-label">
            Status
          </label>

          <select
            className="form-select"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2">

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Update Order
          </button>

        </div>

      </div>
    </div>
  );
}

export default EditOrderModal;