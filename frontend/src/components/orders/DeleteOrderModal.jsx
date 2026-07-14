import { deleteOrder } from '../../services/ordersApi'
import './NewOrderModal.css'

function DeleteOrderModal({ order, onClose, onDeleted }) {
  async function handleDelete() {
    try {
      await deleteOrder(order.orderId)

      alert('Order deleted successfully!')

      await onDeleted()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to delete order')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Delete Order</h2>

        <p>
          Are you sure you want to delete
          <strong> {order.customerName}</strong>'s order?
        </p>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteOrderModal