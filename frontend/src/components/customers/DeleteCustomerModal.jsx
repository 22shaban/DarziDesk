import { deleteCustomer } from '../../services/customersApi'
import '../orders/NewOrderModal.css'

function DeleteCustomerModal({ customer, onClose, onDeleted }) {
  async function handleDelete() {
    try {
      await deleteCustomer(customer.customerId)

      alert('Customer deleted successfully!')

      await onDeleted()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to delete customer')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Delete Customer</h2>

        <p>
          Are you sure you want to delete
          <strong> {customer.customerName}</strong>?
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

export default DeleteCustomerModal