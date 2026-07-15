import EmptyState from '../orders/EmptyState'
import './InventoryTable.css'

const columns = [
  'Fabric',
  'Category',
  'Unit',
  'Quantity',
  'Cost',
  'Selling',
  'Supplier',
  'Status',
  'Actions',
]

function InventoryTable({ inventory }) {
  return (
    <div className="inventory-table-card">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="9">
                <EmptyState
                  title="No inventory found."
                  message='Click "Add Fabric" to create your first inventory item.'
                />
              </td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.inventoryId}>
                <td>{item.fabricName}</td>

                <td>{item.category}</td>

                <td>{item.unit}</td>

                <td>{item.quantity}</td>

                <td>₹{item.costPrice}</td>

                <td>₹{item.sellingPrice}</td>

                <td>{item.supplier}</td>

                <td>{item.status}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
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
  )
}

export default InventoryTable